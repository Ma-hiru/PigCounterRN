package com.zlz.pigcounter.mapper;

import com.common.pojo.entity.Task;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface TaskMapper {
    @Insert("insert into task (employee_id,start_time,end_time,valid,task_name,org_id) values (#{employeeId},#{startTime},#{endTime},#{valid},#{taskName},#{orgId})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Task task);

    @Select("select id,employee_id,start_time,end_time,valid,task_name from task where employee_id = #{id}")
    List<Task> getByEmployeeId(Long id);

    @Select("select id,employee_id,start_time,end_time,valid,task_name from task where org_id=#{orgId}")
    Page<Task> getTasksPage(Long orgId);


}
