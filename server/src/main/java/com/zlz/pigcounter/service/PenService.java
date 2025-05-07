package com.zlz.pigcounter.service;

import com.common.pojo.entity.Building;
import com.common.pojo.entity.Pen;
import com.common.result.PageResult;

import java.util.List;

public interface PenService {
    void addPen(Pen pen);

    void deletePen(Long id);

    PageResult page(int pageNum, int pageSize,Long BuildingId);

    void updatePen(Pen pen);

    List<Long> getPenIdsByBuildingId(Long buildingId);
}
