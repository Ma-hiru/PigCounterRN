package com.common.exception;

public class NotFoundTaskException extends BaseException{
    public NotFoundTaskException() {
        super("任务不存在");
    }
}
