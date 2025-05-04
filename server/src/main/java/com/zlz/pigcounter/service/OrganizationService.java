package com.zlz.pigcounter.service;

public interface OrganizationService {
    void addOrganization();

    String  getOrganizationNameById(Long id);

    Long getOrganizationIdByName(String orgName);
}
