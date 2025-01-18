package appointly.com.appointly_api.dto.patient;

import appointly.com.appointly_api.model.enums.RelationshipDegree;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record PatientDTO(
        @NotBlank(message = "Required field")
        @Size(min = 2, max = 25, message = "Field must have between 2 and 25 characters")
        String firstName,

        @NotBlank(message = "Required field")
        @Size(min = 2, max = 50, message = "Field must have between 2 and 50 characters")
        String surname,

        @NotNull(message = "Required field")
        @Past(message = "The date cannot be in the future")
        LocalDate dateOfBirth,

        @Pattern(
                regexp = "^\\+?[0-9. ()-]{7,25}$",
                message = "Field must be a valid number and have between 8 and 50 characters"
        )
        String phoneNumber,

        @Email(message = "Invalid email")
        @NotBlank(message = "Required field")
        @Size(min = 8, max = 50, message = "Field must have between 8 and 50 characters")
        String email,

        @NotNull(message = "Required field")
        boolean specialPatient,

        @NotNull(message = "Required field")
        boolean underage,

        @Size(min = 2, max = 25, message = "Field must have between 2 and 25 characters")
        String responsibleName,

        @Email(message = "Invalid email")
        @Size(min = 8, max = 50, message = "Field must have between 8 and 50 characters")
        String responsibleEmail,

        @Size(min = 8, max = 25, message = "Field must have between 8 and 25 characters")
        String responsiblePhoneNumber,

        RelationshipDegree relationshipDegree
) {
}
