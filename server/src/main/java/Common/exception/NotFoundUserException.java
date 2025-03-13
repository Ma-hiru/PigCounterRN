package Common.exception;

public class NotFoundUserException extends BaseException{
    public NotFoundUserException() {
        super("用户不存在");
    }
}
