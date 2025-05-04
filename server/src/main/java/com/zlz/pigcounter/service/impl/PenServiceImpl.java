package com.zlz.pigcounter.service.impl;

import com.common.context.BaseContext;
import com.common.exception.UnauthorizedModificationException;
import com.common.pojo.entity.Building;
import com.common.pojo.entity.Pen;
import com.common.pojo.vo.BuildingVO;
import com.common.pojo.vo.PenVO;
import com.common.result.PageResult;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.zlz.pigcounter.mapper.BuildingMapper;
import com.zlz.pigcounter.mapper.EmployeeMapper;
import com.zlz.pigcounter.mapper.PenMapper;
import com.zlz.pigcounter.service.PenService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    @Override
    public void addPen(Pen pen) {
        Long currentId = BaseContext.getCurrentId();
        if(currentId==null||!employeeMapper.getById(currentId).getAdmin()){
            throw new UnauthorizedModificationException("只有管理员能添加猪圈信息");
        }
        penMapper.addPen(pen);
    }

    @Override
    public void deletePen(Long id) {
        Long currentId = BaseContext.getCurrentId();
        if(currentId==null||!employeeMapper.getById(currentId).getAdmin()){
            throw new UnauthorizedModificationException("只有管理员能删除猪圈信息");
        }
        penMapper.deletePen(id);
    }

    @Override
    public PageResult page(int pageNum, int pageSize, int buildingId) {
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
        if(currentId==null||!employeeMapper.getById(currentId).getAdmin()){
            throw new UnauthorizedModificationException("只有管理员能修改猪圈信息");
        }
        penMapper.updatePen(pen);
    }
}
