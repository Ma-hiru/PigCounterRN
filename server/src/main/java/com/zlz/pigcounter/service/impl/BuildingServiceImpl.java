package com.zlz.pigcounter.service.impl;

import Common.context.BaseContext;
import Common.exception.UnauthorizedModificationException;
import Common.pojo.entity.Building;
import Common.pojo.vo.BuildingVO;
import Common.result.PageResult;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.zlz.pigcounter.mapper.BuildingMapper;
import com.zlz.pigcounter.mapper.EmployeeMapper;
import com.zlz.pigcounter.service.BuildingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Override
    public void addBuilding(Building building) {
        //确保只有管理员账号能添加楼栋信息
        Long currentId = BaseContext.getCurrentId();
        if(currentId==null||!employeeMapper.getById(currentId).getIsAdmin()){
            throw new UnauthorizedModificationException("只有管理员能添加楼栋信息");
        }
        log.info("添加楼栋");
        buildingMapper.addBuilding(building);
    }

    @Override
    public void deleteBuilding(Long id) {
        //确保只有管理员账号能删除楼栋信息
        Long currentId = BaseContext.getCurrentId();
        if(currentId==null||!employeeMapper.getById(currentId).getIsAdmin()){
            throw new UnauthorizedModificationException("只有管理员能删除楼栋信息");
        }
        log.info("删除楼栋");
        buildingMapper.deleteBuilding(id);
    }

    @Override
    public PageResult page(int pageNum, int pageSize,int orgId) {
        PageHelper.startPage(pageNum,pageSize);
        Page<Building> page = buildingMapper.page(orgId);
        List<BuildingVO> buildingVOs=new ArrayList<>();
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
        return new PageResult(page.getTotal(),buildingVOs);
    }

    @Override
    public void updateBuilding(Building building) {
        //确保只有管理员账号能修改楼栋信息
        Long currentId = BaseContext.getCurrentId();
        if(currentId==null||!employeeMapper.getById(currentId).getIsAdmin()){
            throw new UnauthorizedModificationException("只有管理员能修改楼栋信息");
        }
        log.info("修改楼栋");
        buildingMapper.updateBuilding(building);
    }
}
