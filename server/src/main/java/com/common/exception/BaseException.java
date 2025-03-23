package com.common.exception;

import java.io.IOException;

public class BaseException extends RuntimeException{
    public BaseException(String message) {
        super(message);
    }
    public BaseException(){
        super();
    }

    public BaseException(String message, IOException e) {
        super(message, e);
    }
}
