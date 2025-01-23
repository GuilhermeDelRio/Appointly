package appointly.com.appointly_api.validators;

import appointly.com.appointly_api.dto.patient.PatientDTO;
import appointly.com.appointly_api.exceptions.NotAllowedException;
import appointly.com.appointly_api.model.enums.RelationshipDegree;
import appointly.com.appointly_api.utils.EnumUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.Period;

@Component
@RequiredArgsConstructor
public class PatientValidator {

    private static final int LEGAL_ADULT_AGE = 18;

    public void verifyIfPatientIsMinor(PatientDTO dto) {
        int patientAge = calculatePatientAge(dto.dateOfBirth());

        if (patientAge < LEGAL_ADULT_AGE) {
            validateResponsibleData(dto);
            EnumUtils.validateIfEnumExists(RelationshipDegree.class ,dto.relationshipDegree());

            if (!dto.underage()) {
                throw new NotAllowedException("The patient should be considered underage");
            }
        }
    }

    private void validateResponsibleData(PatientDTO dto) {
        if (dto.responsibleName() == null ||
                dto.responsibleEmail() == null ||
                dto.responsiblePhoneNumber() == null ||
                dto.relationshipDegree() == null) {
            throw new NotAllowedException("The patient is a minor, fill in the guardian's details");
        }
    }

    private int calculatePatientAge(LocalDate dateOfBirth) {
        return Period.between(dateOfBirth, LocalDate.now()).getYears();
    }
}
