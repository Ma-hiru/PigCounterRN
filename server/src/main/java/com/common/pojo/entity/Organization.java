package com.common.pojo.entity;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class Organization {
    private Long id;
    @NotBlank(message = "组织名称不能为空")
    private String orgName;
    private String logo;
    @NotBlank(message = "组织负责人不能为空")
    private String adminName;
    private String tel;
    private String addr;
}
