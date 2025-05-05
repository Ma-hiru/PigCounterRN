package com.zlz.pigcounter.mapper;

import com.common.pojo.dto.TaskDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface TaskBuildingPenMapper {

    void insert(TaskDTO taskDTO);

    TaskDTO getTaskDetail(Long taskId);

    void batchInsert(List<Map<String, Object>> partition);
}
