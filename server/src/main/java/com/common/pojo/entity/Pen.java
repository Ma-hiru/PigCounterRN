package com.common.pojo.entity;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class Pen {
    private Long id;
    @NotBlank(message = "名称不能为空")
    private String penName;
    @NotNull(message = "所属楼栋不能为空")
    private Long buildingId;
}
