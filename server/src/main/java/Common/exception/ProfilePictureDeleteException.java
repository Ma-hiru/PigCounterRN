package Common.exception;

public class ProfilePictureDeleteException extends BaseException{
    public ProfilePictureDeleteException() {
        super("删除头像失败");
    }
}
