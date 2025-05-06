package com.common.pojo.dto;

import lombok.Data;

@Data
public class ConfirmPenPictureDTO {
    private Long taskId;
    private Long penId;
    private Boolean status;
    private Integer manualCount;
}
