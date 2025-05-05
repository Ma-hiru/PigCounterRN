package com.zlz.pigcounter.mapper;

import com.common.pojo.dto.TaskPenDTO;
import com.common.pojo.entity.Pen;
import com.common.pojo.vo.OrgPenVO;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface PenMapper {
    @Insert("insert into pen (building_id, pen_name) values (#{buidingId},#{penName})")
    void addPen(Pen pen);

    @Delete("delete from pen where id=#{id}")
    void deletePen(Long id);


    @Select("select id, building_id, pen_name from pen where building_id=#{buildingId}")
    Page<Pen> page(Long buildingId);

    @Update("update pen set pen_name=#{penName}, building_id=#{buildingId} where id=#{id}")
    void updatePen(Pen pen);

    @Select("select id, building_id, pen_name from pen where id=#{id}")
    Pen getById(Long id);

    @Select("select id,pen_name as name from pen where building_id= #{buildingId}")
    List<OrgPenVO> getOrgPenVOsByBuildingId(Long buildingId);

    @Delete("delete from pen where building_id=#{id}")
    void deletePenByBuildingId(Long id);

    @Select("select id as penId from pen where building_id= #{buildingId}")
    List<TaskPenDTO> getTaskPenDTOsByBuildingId(Long buildingId);
}
