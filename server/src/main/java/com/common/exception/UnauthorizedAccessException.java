package com.common.exception;

public class UnauthorizedAccessException extends BaseException{
    public UnauthorizedAccessException() {
        super("未授权访问");
    }
}
