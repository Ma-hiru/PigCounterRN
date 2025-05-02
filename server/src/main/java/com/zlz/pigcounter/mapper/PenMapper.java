package com.zlz.pigcounter.mapper;

import com.common.pojo.entity.Pen;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.*;

@Mapper
public interface PenMapper {
    @Insert("insert into pen (building_id, pen_name) values (#{buidingId},#{penName})")
    void addPen(Pen pen);

    @Delete("delete from pen where id=#{id}")
    void deletePen(Long id);


    @Select("select id, building_id, pen_name from pen where building_id=#{buildingId}")
    Page<Pen> page(int buildingId);

    @Update("update pen set pen_name=#{penName}, building_id=#{buildingId} where id=#{id}")
    void updatePen(Pen pen);
}
