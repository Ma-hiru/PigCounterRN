package com.common.pojo.dto;

import lombok.Data;

import java.util.List;

@Data
public class TaskBuildingDTO {
    private Long buildingId;
    private List<TaskPenDTO> pens;
}
