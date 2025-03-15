package Common.exception;

import java.io.IOException;

public class ProfilePictureUploadException extends BaseException{
    public ProfilePictureUploadException(String message) {
        super(message);
    }
    public ProfilePictureUploadException() {
        super();
    }

    public ProfilePictureUploadException(String message, IOException e) {
        super(message, e);
    }
}
