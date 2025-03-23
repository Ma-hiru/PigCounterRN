package com.zlz.pigcounter.service;

import com.common.pojo.entity.Building;
import com.common.result.PageResult;

public interface BuildingService {
    void addBuilding(Building building);

    void deleteBuilding(Long id);

    PageResult page(int pageNum, int pageSize,int orgId);

    void updateBuilding(Building building);
}
