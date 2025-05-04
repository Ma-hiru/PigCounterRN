package com.common.exception;

public class NotFoundOrganization extends BaseException{
    public NotFoundOrganization() {
        super("组织不存在");
    }
}
