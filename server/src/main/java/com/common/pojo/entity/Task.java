package com.common.pojo.entity;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class Task implements Serializable {
    private Long id;
    private String taskName;
    private Long employeeId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Boolean valid;
}
