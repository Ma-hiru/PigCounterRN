package com.zlz.pigcounter.mapper;


import com.common.pojo.entity.Employee;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.*;

@Mapper
public interface EmployeeMapper {
    @Select("select id, name, password,phone, sex, create_time, profile_picture, username, organization from employee where username = #{username}")
    Employee getByUsername(String username);

    @Insert("insert into employee (username,password,name,sex,phone,create_time,profile_picture,organization) values (#{username},#{password},#{name},#{sex},#{phone},#{createTime},#{profilePicture},#{organization})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Employee employee);

    @Select("select id, name, phone, sex, create_time, profile_picture, username, organization ,is_admin from employee where id = #{id}")
    Employee getById(Long id);

    void update(Employee employee);

    @Delete("delete from employee where id = #{id}")
    void deleteById(Long id);

    @Select("select id, name, phone, sex, create_time, profile_picture, username, organization ,is_admin from employee where organization = #{organization}")
    Page<Employee> page(String organization);

    @Select("select profile_picture from employee where id = #{id}")
    String getProfilePictureById(Long id);


    void deleteBatch(Long[] ids);
}
