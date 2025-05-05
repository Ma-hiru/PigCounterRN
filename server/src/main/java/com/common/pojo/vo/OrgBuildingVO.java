package com.common.pojo.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class OrgBuildingVO implements Serializable {
    private Long id;
    private String name;
    private List<OrgPenVO> pens;
}
