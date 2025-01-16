package appointly.com.appointly_api.dto.baseErrorReponse;

import org.springframework.http.HttpStatus;

import java.util.List;

public record ErrorResponse(int status, String msg, List<ErrorField> errors) {
    public static ErrorResponse defaultResponse(String msg) {
        return new ErrorResponse(HttpStatus.BAD_REQUEST.value(), msg, List.of());
    }

    public static ErrorResponse conflict(String msg) {
        return new ErrorResponse(HttpStatus.CONFLICT.value(), msg, List.of());
    }
}
