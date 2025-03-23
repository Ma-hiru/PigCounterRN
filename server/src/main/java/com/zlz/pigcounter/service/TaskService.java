package com.zlz.pigcounter.service;


import com.common.pojo.dto.TaskDTO;
import com.common.result.PageResult;

public interface TaskService {
    void add(TaskDTO taskDTO);

    PageResult getByEmployeeId(Long id);

    PageResult getTasksPage(int pageNum, int pageSize);

    TaskDTO getTaskDetail(Long taskId);
}
