package appointly.com.appointly_api.exceptions;

import appointly.com.appointly_api.dto.baseErrorReponse.ErrorField;
import appointly.com.appointly_api.dto.baseErrorReponse.ErrorResponse;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotAllowedException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleNotAllowedExpection(NotAllowedException e) {
        return ErrorResponse.defaultResponse(e.getMessage());
    }

    @ExceptionHandler(DuplicateDataException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorResponse handleDuplicateDataException(DuplicateDataException e) {
        return ErrorResponse.conflict(e.getMessage());
    }

    @ExceptionHandler(EntityNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleEntityNotFoundException(
            EntityNotFoundException e) {

        return new ErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                e.getMessage(),
                List.of()
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public ErrorResponse handleMethodArgumentNotValidException(
            MethodArgumentNotValidException e) {

        List<FieldError> fieldErrors = e.getFieldErrors();
        List<ErrorField> errorsList = fieldErrors
                .stream()
                .map(fe -> new ErrorField(fe.getField(), fe.getDefaultMessage()))
                .collect(Collectors.toList());

        return new ErrorResponse(
                HttpStatus.UNPROCESSABLE_ENTITY.value()
                , "Validation errors.",
                errorsList);
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleRuntimeException(RuntimeException e) {
        return new ErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "An unexpected error occurred.",
                List.of()
        );
    }
}
