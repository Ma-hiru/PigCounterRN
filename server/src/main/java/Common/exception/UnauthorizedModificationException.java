package Common.exception;

public class UnauthorizedModificationException extends BaseException{
    public UnauthorizedModificationException() {
        super("未授权修改异常");
    }
    public UnauthorizedModificationException(String message) {
        super(message);
    }

}
