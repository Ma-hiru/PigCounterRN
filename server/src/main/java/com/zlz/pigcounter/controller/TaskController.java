package com.zlz.pigcounter.controller;

import com.common.pojo.dto.ConfirmPenPictureDTO;
import com.common.pojo.dto.DetailTaskDTO;
import com.common.pojo.dto.TaskDTO;
import com.common.pojo.dto.PenPictureUploadDTO;
import com.common.pojo.vo.PenPictureVO;
import com.common.result.PageResult;
import com.common.result.Result;
import com.zlz.pigcounter.service.TaskService;
import jakarta.validation.Valid;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@Slf4j
@RequestMapping("/task")
public class TaskController {
    @Autowired
    private TaskService taskService;

    /**
     * 新增任务
     * @param taskDTO
     * @return
     */
    @PostMapping("/add")
    @Caching(evict = {
            @CacheEvict(cacheNames = "task",key = "#taskDTO.employeeId"),
            @CacheEvict(cacheNames = "task_detail",key = "#taskDTO.id"),
            @CacheEvict(cacheNames = "task_page",allEntries = true)
    })
    public Result add(@RequestBody @Valid TaskDTO taskDTO){
        log.info("新增任务：{}",taskDTO);
        taskService.add(taskDTO);
        return Result.success();
    }
    /**
     * 根据employeeId查询任务
     * @param employeeId
     * @return
     */
    @GetMapping("/{employeeId}")
    @Cacheable(cacheNames = "task",key = "#employeeId")
    public Result<PageResult> getByEmployeeId(@PathVariable Long employeeId){
        log.info("根据id查询任务：{}",employeeId);
        return Result.success(taskService.getByEmployeeId(employeeId));
    }

    /**
     * 分页查询所有任务
     * @param pageNum
     * @param pageSize
     * @return
     */
    @GetMapping("/page")
    @Cacheable(cacheNames = "task_page",key = "#pageNum+'-'+#pageSize+'-'+#orgId")
    public Result<PageResult> getTasksPage(int pageNum, int pageSize,Long orgId){
        log.info("分页查询任务：{}",pageNum,pageSize,orgId);
        return Result.success(taskService.getTasksPage(pageNum,pageSize,orgId));
    }
    /**
     * 根据id查询任务详情
     * @param taskId
     * @return
     */
    @GetMapping("/detail/{taskId}")
    @Cacheable(cacheNames = "task_detail",key = "#taskId")
    public Result<DetailTaskDTO> getTaskDetail(@PathVariable Long taskId){
        log.info("查询任务详情：{}",taskId);
        return Result.success(taskService.getTaskDetail(taskId));
    }

    /**
     * 上传猪圈图片并交由ai处理
     *
     * @param uploadDTO
     * @return
     */
    @PostMapping("/upload")
    public Mono<Result<PenPictureVO>> upload(@ModelAttribute PenPictureUploadDTO uploadDTO){
       log.info("上传图片：{}",uploadDTO);
        return taskService.upload(uploadDTO)
                .map(Result::success)
                .doOnError(throwable -> {
                    log.error("上传图片时发生异常: ", throwable);
                })
                .onErrorReturn(Result.error("上传失败"));
    }
    @DeleteMapping("/deletePicture")
    @CacheEvict(cacheNames = "task_detail",key = "#taskId")
    public Result deletePicture(@RequestParam Long taskId,@RequestParam Long penId){
        log.info("删除图片：{}",taskId);
        taskService.deletePicture(taskId,penId);
        return Result.success();
    }

    /**
     * 确认任务图片
     * @param confirmPenPictureDTO
     * @return
     */
    @PostMapping("/confirm")
    @CacheEvict(cacheNames = "task_detail",key = "#confirmPenPictureDTO.taskId")
    public Result confirmPicture(@RequestBody ConfirmPenPictureDTO confirmPenPictureDTO){
        log.info("确认图片：{}",confirmPenPictureDTO);
        taskService.confirmPicture(confirmPenPictureDTO);
        return Result.success();
    }
}
