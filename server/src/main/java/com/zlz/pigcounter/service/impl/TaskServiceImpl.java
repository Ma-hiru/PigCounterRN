package com.zlz.pigcounter.service.impl;

import com.common.exception.NotFoundTaskException;
import com.common.pojo.dto.TaskDTO;
import com.common.pojo.entity.Task;
import com.common.result.PageResult;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.zlz.pigcounter.mapper.TaskBuildingPenMapper;
import com.zlz.pigcounter.mapper.TaskMapper;
import com.zlz.pigcounter.service.TaskService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {
    @Autowired
    private TaskMapper taskMapper;

    @Autowired
    private TaskBuildingPenMapper taskBuildingPenMapper;
    @Override
    @Transactional
    public void add(TaskDTO taskDTO) {

        //插入任务表
        Task task = new Task();
        BeanUtils.copyProperties(taskDTO,task);
        task.setVaild(true);
        taskMapper.insert(task);
        //插入任务详情表
        taskDTO.setId(task.getId());
        taskBuildingPenMapper.insert(taskDTO);
    }

    @Override
    public PageResult getByEmployeeId(Long employeeid) {
        List<Task> tasks = taskMapper.getByEmployeeId(employeeid);
        if(tasks==null){
           throw new NotFoundTaskException();
        }
        return new PageResult(tasks.size(),tasks);
    }

    @Override
    public PageResult getTasksPage(int pageNum, int pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        Page<Task> page =taskMapper.getTasksPage();
        if (page==null){
            throw  new  NotFoundTaskException();
        }
        return new PageResult(page.getTotal(),page.getResult());
    }

    @Override
    public TaskDTO getTaskDetail(Long taskId) {

        TaskDTO taskDetail = taskBuildingPenMapper.getTaskDetail(taskId);
        if (taskDetail==null){
            throw new NotFoundTaskException();
        }
        return taskDetail;
    }
}
