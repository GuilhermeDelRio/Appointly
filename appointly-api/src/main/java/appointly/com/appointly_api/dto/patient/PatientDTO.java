package appointly.com.appointly_api.dto.patient;

import appointly.com.appointly_api.model.enums.RelationshipDegree;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record PatientDTO(
        @NotBlank
        @Size(min = 2, max = 25)
        String firstName,

        @NotBlank
        @Size(min = 2, max = 50)
        String surname,

        @NotNull
        @Past
        LocalDate dateOfBirth,

        @NotBlank
        @Size(max = 25)
        String phoneNumber,

        @NotBlank
        @Size(min = 8, max = 50)
        String email,

        @NotNull
        boolean specialPatient,

        @NotNull
        boolean underage,

        @Size(min = 2, max = 25)
        String responsibleName,

        @Size(min = 8, max = 50)
        String responsibleEmail,

        @Size(min = 8, max = 25)
        String responsiblePhoneNumber,

        RelationshipDegree RelationshipDegree
) {
}
