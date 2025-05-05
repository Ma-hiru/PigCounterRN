package com.common.exception;

public class NotFoundBuilding extends BaseException{
    public NotFoundBuilding() {
        super("没有找到该楼栋");
    }
}
