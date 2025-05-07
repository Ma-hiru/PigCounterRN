package com.zlz.pigcounter.mapper;

import com.common.pojo.entity.Building;
import com.common.pojo.vo.OrgBuildingVO;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface BuildingMapper {
    @Insert("insert into building (org_id, building_name) values (#{orgId},#{buildingName})")
    void addBuilding(Building building);

    @Delete("delete from building where id=#{id}")
    void deleteBuilding(Long id);


    @Select("select id, org_id, building_name from building where org_id= #{orgId}")
    Page<Building> page(Long orgId);

    @Update("update building set building_name=#{buildingName}, org_id=#{orgId} where id=#{id}")
    void updateBuilding(Building building);

    @Select("select building_name from building where id=#{buildingId}")
    String getBuildingNameById(Long buildingId);

    @Select("select id, org_id, building_name from building where id=#{id}")
    Building getById(Long id);
    
    @Select("select id,building_name as name from building where org_id= #{orgId}")
    List<OrgBuildingVO> getOrgBuildingVOsByOrgId(Long orgId);

}
