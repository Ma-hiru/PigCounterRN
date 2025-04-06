package com.zlz.pigcounter.mapper;

import com.common.pojo.entity.PenPicture;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface PenPictureMapper {

    void insertBatch(List<PenPicture> result);
}
