package com.zlz.pigcounter.handler;

import Common.exception.BaseException;
import Common.result.Result;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler
    public Result<String> exceptionHandler(BaseException e) {
        return Result.error(e.getMessage());
    }
}
