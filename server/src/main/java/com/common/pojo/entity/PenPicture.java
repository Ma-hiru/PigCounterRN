package com.common.pojo.entity;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class PenPicture implements Serializable {
    Long id;
    Long penId;
    String picturePath;
    String outputPicturePath;
    LocalDateTime time;
    Integer count;
}
