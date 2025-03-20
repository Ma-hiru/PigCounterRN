package com.zlz.pigcounter.mapper;

import Common.pojo.entity.Building;
import Common.pojo.entity.Pen;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.*;

@Mapper
public interface PenMapper {
    @Insert("insert into pen (building_id, pen_name) values (#{buidingId},#{penName})")
    void addBuilding(Pen pen);

    @Delete("delete from pen where id=#{id}")
    void deleteBuilding(Long id);


    Page<Pen> page(int buildingId);

    @Update("update pen set pen_name=#{penName}, building_id=#{buildingId} where id=#{id}")
    void updateBuilding(Pen pen);
}
