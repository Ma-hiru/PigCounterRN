package com.common.pojo.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class BuildingDTO implements Serializable {
    private Long buildingId;


    @NotNull(message = "选择的猪栏不能为空")
    private List<PenDTO> pens;
}
