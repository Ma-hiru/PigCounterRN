package com.zlz.pigcounter.mapper;

import com.common.pojo.dto.TaskDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TaskBuildingPenMapper {

    void insert(TaskDTO taskDTO);

    TaskDTO getTaskDetail(Long taskId);
}
