package com.zlz.pigcounter.service;

import Common.pojo.entity.Building;
import Common.result.PageResult;

public interface PenService {
    void addBuilding(Building building);

    void deleteBuilding(Long id);

    PageResult page(int pageNum, int pageSize,int orgId);

    void updateBuilding(Building building);
}
