package com.zlz.pigcounter.service.impl;

import com.common.context.BaseContext;
import com.common.exception.NotFoundPen;
import com.common.exception.UnauthorizedModificationException;
import com.common.pojo.entity.Building;
import com.common.pojo.entity.Pen;
import com.common.pojo.vo.BuildingVO;
import com.common.pojo.vo.PenVO;
import com.common.result.PageResult;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.zlz.pigcounter.mapper.*;
import com.zlz.pigcounter.service.PenService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


@Service
@Slf4j
public class PenServiceImpl implements PenService {
    @Autowired
    private PenMapper penMapper;
    @Autowired
    private EmployeeMapper employeeMapper;
    @Autowired
    private BuildingMapper buildingMapper;
    @Autowired
    private CacheManager cacheManager;
    @Autowired
    private PenPictureMapper  penPictureMapper;
    @Autowired
    private TaskBuildingPenMapper taskBuildingPenMapper;

    @Override
    public void addPen(Pen pen) {
        Long currentId = BaseContext.getCurrentId();
        Long orgId = buildingMapper.getById(pen.getBuildingId()).getOrgId();
        if(currentId==null||!employeeMapper.getById(currentId).getAdmin()||!employeeMapper.getById(currentId).getOrgId().equals(orgId)){
            throw new UnauthorizedModificationException("只有同组织管理员能添加猪圈信息");
        }
        penMapper.addPen(pen);
        evictBuildingAndPenCacheByOrgId(orgId);
    }

    @Override
    @Transactional
    public void deletePen(Long id) {
        Long currentId = BaseContext.getCurrentId();
        Pen pen = penMapper.getById(id);
        if(pen==null){
            throw new NotFoundPen();
        }
        Long orgId = buildingMapper.getById(pen.getBuildingId()).getOrgId();
        if(currentId==null||!employeeMapper.getById(currentId).getAdmin()||!employeeMapper.getById(currentId).getOrgId().equals(orgId)){
            throw new UnauthorizedModificationException("只有同组织管理员能删除猪圈信息");
        }
        penMapper.deletePen(id);
        penPictureMapper.deletePenPictureByPenId(id);
        taskBuildingPenMapper.deleteByPenId(id);
        evictBuildingAndPenCacheByOrgId(orgId);
    }

    @Override
    public PageResult page(int pageNum, int pageSize, Long buildingId) {
        PageHelper.startPage(pageNum,pageSize);
        try (Page<Pen> page = penMapper.page(buildingId)) {
            List<PenVO> penVOs = new ArrayList<>();
            page.getResult().forEach(pen -> {
                penVOs.add(PenVO.builder()
                        .id(pen.getId())
                        .penName(pen.getPenName())
                        .buildingName(buildingMapper.getBuildingNameById(pen.getBuildingId()))
                        .build()
                );
            });
            return new PageResult(page.getTotal(), penVOs);
        }
    }

    @Override
    public void updatePen(Pen pen) {
        Long currentId = BaseContext.getCurrentId();
        Pen pen1 = penMapper.getById(pen.getId());
        if(pen1==null){
            throw new NotFoundPen();
        }
        Long orgId = buildingMapper.getById(pen1.getBuildingId()).getOrgId();
        if(currentId==null||!employeeMapper.getById(currentId).getAdmin()||!employeeMapper.getById(currentId).getOrgId().equals(orgId)){
            throw new UnauthorizedModificationException("只有同组织管理员能修改猪圈信息");
        }
        penMapper.updatePen(pen);
        evictBuildingAndPenCacheByOrgId(orgId);
    }

    @Override
    public List<Long> getPenIdsByBuildingId(Long buildingId) {
        List<Long> penIds ;
        penIds  = penMapper.getPenIdsByBuildingId(buildingId);
        if(penIds==null){
            return new ArrayList<>();
        }
        return penIds;
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
