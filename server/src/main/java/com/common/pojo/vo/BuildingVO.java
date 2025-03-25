package com.common.pojo.vo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BuildingVO {
    private Long id;
    private String buildingName;
    private String orgName;
    private String orgCode;
}
