package com.common.pojo.entity;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ProfilePicture {
    private Long id;
    private String profilePicture;
    private Long employeeId;
    private LocalDateTime uploadTime;
    private Boolean isCurrent;

}
