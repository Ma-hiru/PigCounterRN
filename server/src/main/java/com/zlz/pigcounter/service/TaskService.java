package com.zlz.pigcounter.service;


import com.common.pojo.dto.PenPictureUploadDTO;
import com.common.pojo.dto.TaskDTO;
import com.common.pojo.vo.PenPictureVO;
import com.common.result.PageResult;
import reactor.core.publisher.Mono;

public interface TaskService {
    void add(TaskDTO taskDTO);

    PageResult getByEmployeeId(Long id);

    PageResult getTasksPage(int pageNum, int pageSize);

    TaskDTO getTaskDetail(Long taskId);

    Mono<PenPictureVO> upload(PenPictureUploadDTO uploadDTO);
}
