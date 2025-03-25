package com.common.exception;

public class UserAlreadyExistsException extends BaseException{
    public UserAlreadyExistsException()
    {
        super("用户名已存在");
    }
}
