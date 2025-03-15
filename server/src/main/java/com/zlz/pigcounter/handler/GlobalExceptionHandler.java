package com.zlz.pigcounter.handler;

import Common.exception.BaseException;
import Common.result.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    @ExceptionHandler
    public Result<String> exceptionHandler(BaseException e) {
        log.info(e.getMessage());
        return Result.error(e.getMessage());
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Result<Map<String,String>> handleValidException(MethodArgumentNotValidException e) {
        log.info(e.getMessage());
        StringBuilder sb=new StringBuilder();
        e.getBindingResult().getFieldErrors().forEach((error)->
        {
            String field = error.getField();
            String message= error.getDefaultMessage();
            sb.append(field).append(":").append(message).append(";");
        });

        return Result.error(sb.toString());
    }
    @ExceptionHandler Result <String> exceptionHandler(Exception e) {
        log.info(e.getMessage());
        return Result.error(e.getMessage());
    }
}
