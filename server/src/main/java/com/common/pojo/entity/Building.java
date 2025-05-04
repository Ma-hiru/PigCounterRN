package com.common.pojo.entity;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class Building {
    private Long id;

    @NotBlank(message = "名称不能为空")
    private String buildingName;

    @NotBlank(message = "所属组织不能为空")
    private Long orgId;
}
