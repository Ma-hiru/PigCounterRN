package com.zlz.pigcounter.controller.admin;

import com.common.pojo.dto.TaskDTO;
import com.common.result.PageResult;
import com.common.result.Result;
import com.zlz.pigcounter.service.TaskService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.web.bind.annotation.*;

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
    @Cacheable(cacheNames = "task",key = "#pageNum+'-'+#pageSize")
    public Result<PageResult> getTasksPage(int pageNum, int pageSize){
        log.info("分页查询任务：{}",pageNum,pageSize);
        return Result.success(taskService.getTasksPage(pageNum,pageSize));
    }
    /**
     * 根据id查询任务详情
     * @param taskId
     * @return
     */
    @GetMapping("/detail/{taskId}")
    @Cacheable(cacheNames = "task_detail",key = "#taskId")
    public Result<TaskDTO> getTaskDetail(@PathVariable Long taskId){
        log.info("查询任务详情：{}",taskId);
        return Result.success(taskService.getTaskDetail(taskId));
    }

}
