package com.zlz.pigcounter.mapper;


import Common.pojo.entity.Employee;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface EmployeeMapper {
    @Select("select * from employee where username = #{username}")
    Employee getByUsername(String username);

    @Insert("insert into employee (username,password,name,sex,phone,create_time,profile_picture,organization) values (#{username},#{password},#{name},#{sex},#{phone},#{createTime},#{profilePicture},#{organization})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Employee employee);

    @Select("select * from employee where id = #{id}")
    Employee getById(Long id);

    void update(Employee employee);
}
