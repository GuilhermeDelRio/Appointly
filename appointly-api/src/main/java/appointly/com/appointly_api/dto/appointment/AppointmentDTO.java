package appointly.com.appointly_api.dto.appointment;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.UUID;

public record AppointmentDTO(
        @NotNull(message = "Field Required")

        @Future(message = "The date cannot be in the past")
        LocalDateTime initialDate,

        @Future(message = "The date cannot be in the past")
        LocalDateTime finalDate,

        @NotNull(message = "Field Required")
        String appointmentStatus,

        @NotNull(message = "Field Required")
        UUID idPatient
) {
}
