package com.common.pojo.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class PenDTO implements Serializable {
    private Long penId;
    private int count;
    private String picturePath;
    private String outputPicturePath;
}
