package com.common.pojo.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class DetailTaskDTO implements Serializable {
    private Long id;
    private Long employeeId;
    private String taskName;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime startTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime endTime;

    @Valid
    @NotNull(message = "选择的楼栋不能为空")
    private List<DetailBuildingDTO> buildings;
}
