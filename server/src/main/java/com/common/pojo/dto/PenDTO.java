package com.common.pojo.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class PenDTO implements Serializable {
    private Long penId;
    private int penNum;
    private String picturePath;
}
