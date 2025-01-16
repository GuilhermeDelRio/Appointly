package appointly.com.appointly_api.dto.patient;

import java.time.LocalDate;
import java.util.UUID;

public record GetPatientDTO(
        UUID id,
        String firstName,
        String surname,
        LocalDate dateOfBirth,
        String phoneNumber,
        String email,
        boolean specialPatient,
        boolean underage,
        String responsibleName,
        String responsibleEmail,
        String responsiblePhoneNumber,
        appointly.com.appointly_api.model.enums.RelationshipDegree RelationshipDegree) {
}
