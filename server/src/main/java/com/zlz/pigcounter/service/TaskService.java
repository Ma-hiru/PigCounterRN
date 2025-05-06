package com.zlz.pigcounter.service;


import com.common.pojo.dto.ConfirmPenPictureDTO;
import com.common.pojo.dto.DetailTaskDTO;
import com.common.pojo.dto.PenPictureUploadDTO;
import com.common.pojo.dto.TaskDTO;
import com.common.pojo.vo.PenPictureVO;
import com.common.result.PageResult;
import reactor.core.publisher.Mono;

public interface TaskService {
    void add(TaskDTO taskDTO);

    PageResult getByEmployeeId(Long id);

    PageResult getTasksPage(int pageNum, int pageSize);

    DetailTaskDTO getTaskDetail(Long taskId);

    Mono<PenPictureVO> upload(PenPictureUploadDTO uploadDTO);

    void deletePicture(Long taskId, Long penId);

    void confirmPicture(ConfirmPenPictureDTO confirmPenPictureDTO);
}
