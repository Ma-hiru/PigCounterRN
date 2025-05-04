package com.common.pojo.vo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PenVO {
    private Long id;
    private String penName;
    private String buildingName;
}
