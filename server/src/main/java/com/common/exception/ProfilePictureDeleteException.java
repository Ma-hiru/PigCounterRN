package com.common.exception;

public class ProfilePictureDeleteException extends BaseException{
    public ProfilePictureDeleteException() {
        super("删除头像失败");
    }
}
