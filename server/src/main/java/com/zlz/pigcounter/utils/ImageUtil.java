package com.zlz.pigcounter.utils;

import com.common.exception.ProfilePictureDeleteException;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Objects;
import java.util.UUID;

public class ImageUtil {
    public static void uploadImage(MultipartFile imageFile, String filePath,String imageSavePath) throws IOException {

        if(imageFile==null) return;
        File Dir= new File(imageSavePath);
        if(!Dir.exists()){
            Dir.mkdirs();
        }
        try (InputStream inputStream = imageFile.getInputStream();
             FileOutputStream outputStream = new FileOutputStream(filePath)) {
            byte[] buffer = new byte[1024];
            int bytes;
            while ((bytes = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytes);
            }
        }

    }
    public static boolean isValidImageFile(MultipartFile file) {
        // 检查 MIME 类型
        String contentType = file.getContentType();
        if (contentType != null && contentType.startsWith("image")) {
            return true;
        }

        // 检查文件扩展名
        String originalFilename = file.getOriginalFilename();
        if (originalFilename != null) {
            String fileExtension = originalFilename.toLowerCase();
            return fileExtension.endsWith(".jpg") || fileExtension.endsWith(".jpeg") ||
                    fileExtension.endsWith(".png") || fileExtension.endsWith(".gif") ||
                    fileExtension.endsWith(".bmp") || fileExtension.endsWith(".tiff");
        }

        return false;
    }
    public static void deleteImage(String imagePath) {


        File file = new File(imagePath);
        if (file.exists()) {
            if(!file.delete()){
                throw new ProfilePictureDeleteException();
            };
        }

    }
    public static String getNewImagePath(MultipartFile imageFile, String imageSavePath,String dir) {
        String fileExtension = Objects.requireNonNull(imageFile.getOriginalFilename()).substring(imageFile.getOriginalFilename().lastIndexOf(".") );
        return imageSavePath + dir+ UUID.randomUUID() + fileExtension;
    }
    public static String getFileNameWithExtension(String filePath) {
        if (filePath == null || filePath.isEmpty()) {
            return "";
        }
        int lastSlashIndex = filePath.lastIndexOf('/');
        if (lastSlashIndex == -1) {
            lastSlashIndex = filePath.lastIndexOf('\\');
        }
        if (lastSlashIndex == -1) {
            return filePath; // 如果没有找到斜杠，则整个路径就是文件名
        }
        return filePath.substring(lastSlashIndex + 1);
    }
}
