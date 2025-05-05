package com.common.pojo.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class OrgBuildingAndPenVO implements Serializable {
    private Long orgId;
    private List<OrgBuildingVO> buildings;
}
