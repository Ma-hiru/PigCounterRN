package com.zlz.pigcounter.handler;

import com.common.exception.BaseException;
import com.common.result.Result;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

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

    @ExceptionHandler(ExpiredJwtException.class)
    public Result<String> handleExpiredJwtException(ExpiredJwtException ex) {
        log.error("JWT令牌已过期: {}", ex.getMessage());
        return Result.error(ex.getMessage());
    }
}
