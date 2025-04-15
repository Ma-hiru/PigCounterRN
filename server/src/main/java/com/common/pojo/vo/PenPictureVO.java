package com.common.pojo.vo;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

import java.util.List;

@Data
@Builder
public class PenPictureVO implements Serializable {
    List<String> picturePath;
    List<String> outputPicturePath;
    Long taskId;
    List <Integer> count;
}
