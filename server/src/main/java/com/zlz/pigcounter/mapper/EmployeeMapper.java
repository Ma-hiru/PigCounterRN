package com.zlz.pigcounter.mapper;


import Common.pojo.entity.Employee;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface EmployeeMapper {
    @Select("select * from employee where username = #{username}")
    Employee getByUsername(String username);

    @Insert("insert into employee (username,password,name,sex,phone,create_time,profile_picture) values (#{username},#{password},#{name},#{sex},#{phone},#{createTime},#{profilePicture})")
    void insert(Employee employee);
}
