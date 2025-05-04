package com.zlz.pigcounter.service;

import com.common.pojo.entity.Building;
import com.common.pojo.entity.Pen;
import com.common.result.PageResult;

public interface PenService {
    void addPen(Pen pen);

    void deletePen(Long id);

    PageResult page(int pageNum, int pageSize,int BuildingId);

    void updatePen(Pen pen);
}
