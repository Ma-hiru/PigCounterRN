package com.common.pojo.entity;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class Building {
    private Long id;

    @NotBlank(message = "名称不能为空")
    private String buildingName;

    @NotNull(message = "所属组织不能为空")
    private Long orgId;
}
