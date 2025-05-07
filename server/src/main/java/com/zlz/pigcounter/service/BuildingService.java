package com.zlz.pigcounter.service;

import com.common.pojo.entity.Building;
import com.common.pojo.vo.OrgBuildingAndPenVO;
import com.common.result.PageResult;

public interface BuildingService {
    void addBuilding(Building building);

    void deleteBuilding(Long id);

    PageResult page(int pageNum, int pageSize,Long orgId);

    void updateBuilding(Building building);

    OrgBuildingAndPenVO getBuildingAndPenByOrgId(Long orgId);
}
