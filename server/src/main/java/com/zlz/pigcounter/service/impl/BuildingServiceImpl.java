package com.zlz.pigcounter.service.impl;

import com.common.context.BaseContext;
import com.common.exception.BaseException;
import com.common.exception.NotFoundBuilding;
import com.common.exception.UnauthorizedModificationException;
import com.common.pojo.entity.Building;
import com.common.pojo.vo.BuildingVO;
import com.common.pojo.vo.OrgBuildingAndPenVO;
import com.common.pojo.vo.OrgBuildingVO;
import com.common.result.PageResult;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.zlz.pigcounter.mapper.BuildingMapper;
import com.zlz.pigcounter.mapper.EmployeeMapper;
import com.zlz.pigcounter.mapper.PenMapper;
import com.zlz.pigcounter.service.BuildingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class BuildingServiceImpl implements BuildingService {
    @Autowired
    private BuildingMapper buildingMapper;

    @Autowired
    private EmployeeMapper employeeMapper;

    @Autowired
    private PenMapper penMapper;
    @Autowired
    private CacheManager cacheManager;
    @Override
    public void addBuilding(Building building) {
        //确保只有管理员账号能添加楼栋信息
        Long currentId = BaseContext.getCurrentId();
        if(currentId==null||!employeeMapper.getById(currentId).getAdmin()||!employeeMapper.getById(currentId).getOrgId().equals(building.getOrgId())){
            throw new UnauthorizedModificationException("只有同组织管理员能添加楼栋信息");
        }
        log.info("添加楼栋");
        buildingMapper.addBuilding(building);
        evictBuildingAndPenCacheByOrgId(building.getOrgId());
    }

    @Override
    public void deleteBuilding(Long id) {
        //确保只有管理员账号能删除楼栋信息
        Long currentId = BaseContext.getCurrentId();
        Building building = buildingMapper.getById(id);
        if(building==null){
            throw new NotFoundBuilding();
        }
        if(currentId==null||!employeeMapper.getById(currentId).getAdmin()||!employeeMapper.getById(currentId).getOrgId().equals(building.getOrgId())){
            throw new UnauthorizedModificationException("只有同组织管理员能删除楼栋信息");
        }
        log.info("删除楼栋");
        buildingMapper.deleteBuilding(id);

        //删除该楼栋下所有猪圈信息
        penMapper.deletePenByBuildingId(id);
        evictBuildingAndPenCacheByOrgId(building.getOrgId());
    }

    @Override
    public PageResult page(int pageNum, int pageSize,Long orgId) {
        PageHelper.startPage(pageNum,pageSize);
        try (Page<Building> page = buildingMapper.page(orgId)) {
            List<BuildingVO> buildingVOs = new ArrayList<>();
            page.getResult().forEach(building -> {
                buildingVOs.add(BuildingVO.builder()
                        .id(building.getId())
                        .buildingName(building.getBuildingName())
                        //TODO 获取组织名称和编码
                        .orgName(null)
                        .orgCode(null)
                        .build()
                );
            });
            return new PageResult(page.getTotal(), buildingVOs);
        }
    }

    @Override
    public void updateBuilding(Building building) {
        //确保只有管理员账号能修改楼栋信息
        Long currentId = BaseContext.getCurrentId();
        Building building1 = buildingMapper.getById(building.getId());
        if(building1==null){
            throw new NotFoundBuilding();
        }
        if(currentId==null||!employeeMapper.getById(currentId).getAdmin()||!employeeMapper.getById(currentId).getOrgId().equals(building1.getOrgId())){
            throw new UnauthorizedModificationException("只有同组织管理员能修改楼栋信息");
        }
        log.info("修改楼栋");
        buildingMapper.updateBuilding(building);
        evictBuildingAndPenCacheByOrgId(building.getOrgId());
    }

    @Override
    public OrgBuildingAndPenVO getBuildingAndPenByOrgId(Long orgId) {
        if(!orgId.equals(employeeMapper.getById(BaseContext.getCurrentId()).getOrgId())){
            throw new BaseException("只有同组织管理员能查看组织楼栋信息");
        }
        List<OrgBuildingVO> buildings = buildingMapper.getOrgBuildingVOsByOrgId(orgId);
            if (buildings == null){
                throw new NotFoundBuilding();
            }
            OrgBuildingAndPenVO orgBuildingAndPenVO = new OrgBuildingAndPenVO();
            buildings.forEach(building -> {
                Long buildingId = building.getId();
                building.setPens(penMapper.getOrgPenVOsByBuildingId(buildingId));
            });
            orgBuildingAndPenVO.setBuildings(buildings);
            orgBuildingAndPenVO.setOrgId(orgId);
            return orgBuildingAndPenVO;
        }
    private void evictBuildingAndPenCacheByOrgId(Long orgId) {
        if (orgId == null) {
            return;
        }

        // 获取缓存并清除
    Cache cache = cacheManager.getCache("building_and_pen_by_orgId");
        if (cache != null) {
            cache.evict(orgId); // 清除 key=orgId 的缓存
        }
    }

}
