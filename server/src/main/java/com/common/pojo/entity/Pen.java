package com.common.pojo.entity;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class Pen {
    private Long id;
    @NotBlank(message = "名称不能为空")
    private String penName;
    @NotBlank(message = "所属楼栋不能为空")
    private String buildingId;
}
