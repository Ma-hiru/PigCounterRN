package com.zlz.pigcounter.mapper;


import com.common.pojo.entity.Employee;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.*;

@Mapper
public interface EmployeeMapper {
    @Select("select id, name, password,phone, sex, create_time, profile_picture, username, org_id,admin from employee where username = #{username}")
    Employee getByUsername(String username);

    @Insert("insert into employee (username,password,name,sex,phone,create_time,profile_picture,org_id,admin) values (#{username},#{password},#{name},#{sex},#{phone},#{createTime},#{profilePicture},#{organization},#{admin})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Employee employee);

    @Select("select id, name, phone, sex, create_time, profile_picture, username, org_id ,admin from employee where id = #{id}")
    Employee getById(Long id);

    void update(Employee employee);

    @Delete("delete from employee where id = #{id}")
    void deleteById(Long id);

    @Select("select id, name, phone, sex, create_time, profile_picture, username, org_id ,admin from employee where org_id = #{org_id}")
    Page<Employee> page(Long org_id);

    @Select("select profile_picture from employee where id = #{id}")
    String getProfilePictureById(Long id);


    void deleteBatch(Long[] ids);
}
