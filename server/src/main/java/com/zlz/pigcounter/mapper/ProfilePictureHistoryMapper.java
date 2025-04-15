package com.zlz.pigcounter.mapper;

import com.common.pojo.entity.ProfilePicture;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ProfilePictureHistoryMapper {
    @Insert("    insert into profile_picture_history (employee_id, profile_picture, upload_time, is_current) values (#{employeeId}, #{profilePicture}, #{uploadTime}, #{isCurrent})")
    void insert(ProfilePicture profilePicture);

    @Update("update profile_picture_history set is_current = #{isCurrent} where profile_picture = #{profilePicture}")
    void updateIsCurrent(String profilePicture,Boolean isCurrent);

    @Select("select profile_picture from profile_picture_history where employee_id = #{id}")
    List<String> getByEmployeeId(Long id);

    void deleteByEmployeeIds(Long[] ids);

    @Delete("delete from profile_picture_history where profile_picture=#{profilePicture} ")
    void deleteByProfilePicture(String profilePicture);
}
