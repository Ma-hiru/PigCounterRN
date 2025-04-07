package com.common.pojo.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

@Data
public class PenPictureUploadDTO implements Serializable {
    @NotNull(message = "ID不能为空")
    Long penId;
    @NotEmpty(message = "至少上传一张图片")
    private MultipartFile[] files;
}
