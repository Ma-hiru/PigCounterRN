package com.zlz.pigcounter.service.impl;

import com.zlz.pigcounter.mapper.OrganizationMapper;
import com.zlz.pigcounter.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrganizationServiceImpl implements OrganizationService {
    @Autowired
    private OrganizationMapper organizationMapper;
    @Override
    public void addOrganization() {

    }

    /**
     * 根据id获取组织名称
     * @param id
     * @return
     */
    @Override
    public String getOrganizationNameById(Long id) {
     return organizationMapper.getOrganizationNameById(id);
    }

    /**
     * 根据组织名称获取组织id
     * @param orgName
     * @return
     */
    @Override
    public Long getOrganizationIdByName(String orgName) {
        return organizationMapper.getOrganizationIdByName(orgName);
    }


}
