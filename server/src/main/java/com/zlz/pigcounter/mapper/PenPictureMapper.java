package com.zlz.pigcounter.mapper;

import com.common.pojo.dto.PenDTO;
import com.common.pojo.entity.PenPicture;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface PenPictureMapper {

    void insertBatch(List<PenPicture> result);

    @Delete("delete from pen_picture where task_id = #{taskId} and pen_id = #{penId}")
    void deletePicture(Long taskId, Long penId);

    @Select("select picture_path,output_picture_path from pen_picture where pen_id=#{penId} and task_id=#{taskId}")
    PenDTO getPicturePath(Long taskId, Long penId);
}
