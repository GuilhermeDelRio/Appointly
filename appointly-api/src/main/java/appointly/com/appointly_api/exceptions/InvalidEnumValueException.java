package appointly.com.appointly_api.exceptions;

public class InvalidEnumValueException extends RuntimeException {
  public InvalidEnumValueException(String message, Throwable cause) {
    super(message, cause);
  }
}
