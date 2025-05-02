package com.zlz.pigcounter.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface OrganizationMapper {

    @Select("select org_name from organization where id=#{id}")
    String getOrganizationNameById(Long id);

    @Select("select id from organization where org_name=#{orgName}")
    Long getOrganizationIdByName(String orgName);
}
