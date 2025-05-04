package com.zlz.pigcounter.controller;

import com.common.pojo.entity.Organization;
import com.common.result.Result;
import com.zlz.pigcounter.service.OrganizationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/org")
public class OrganizationController {
    @Autowired
    private OrganizationService organizationService;

    @PostMapping ("/add")
    public Result addOrganization(@RequestBody @Validated Organization organization){
        log.info("添加组织");
        organizationService.addOrganization();
        return Result.success();
    }


}
