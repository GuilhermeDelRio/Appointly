package appointly.com.appointly_api.exceptions;

public class NotAllowedException extends RuntimeException {
    public NotAllowedException(String message) {
        super(message);
    }
}
