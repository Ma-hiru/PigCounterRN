package com.zlz.pigcounter.mapper;

import com.common.pojo.entity.Building;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.*;

@Mapper
public interface BuildingMapper {
    @Insert("insert into building (org_id, building_name) values (#{orgId},#{buildingName})")
    void addBuilding(Building building);

    @Delete("delete from building where id=#{id}")
    void deleteBuilding(Long id);


    Page<Building> page(int orgId);

    @Update("update building set building_name=#{buildingName}, org_id=#{orgId} where id=#{id}")
    void updateBuilding(Building building);
}
