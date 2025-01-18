package appointly.com.appointly_api.service;

import appointly.com.appointly_api.controller.mappers.PatientMapper;
import appointly.com.appointly_api.dto.patient.GetPatientDTO;
import appointly.com.appointly_api.dto.patient.PatientDTO;
import appointly.com.appointly_api.exceptions.DuplicateDataException;
import appointly.com.appointly_api.exceptions.InvalidEnumValueException;
import appointly.com.appointly_api.exceptions.NotAllowedException;
import appointly.com.appointly_api.model.Patient;
import appointly.com.appointly_api.model.enums.RelationshipDegree;
import appointly.com.appointly_api.repository.PatientRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PatientService {

    private static final int LEGAL_ADULT_AGE = 18;

    private final PatientRepository patientRepository;
    private final PatientMapper mapper;

    public Patient createPatient(PatientDTO dto) {
        validateIfEnumExists(dto);

        Patient patient = mapper.toEntity(dto);

        Optional<Patient> alreadyExistsPatient = patientRepository
                .findByFirstNameIgnoreCaseAndSurnameIgnoreCase(patient.getFirstName(), patient.getSurname());

        if (alreadyExistsPatient.isPresent()) {
            throw new DuplicateDataException("Already exists a patient with the same first name and surname.");
        }

        verifyIfPatientIsMinor(patient);
        return patientRepository.save(patient);
    }

    public GetPatientDTO getPatientById(UUID id) {
        return patientRepository.findById(id)
                .map(mapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found"));
    }

    public void updatePatient(UUID id, PatientDTO dto) {
        validateIfEnumExists(dto);

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found"));

        patientRepository.findByFirstNameIgnoreCaseAndSurnameIgnoreCase(dto.firstName(), dto.surname())
               .ifPresent(existingPatient -> {
                   if (!existingPatient.getId().equals(id)) {
                       throw new DuplicateDataException("Already exists a patient with the same first name and surname.");
                   }
               });

        mapper.updatePatientFromDto(dto, patient);
        verifyIfPatientIsMinor(patient);

        patientRepository.save(patient);
    }

    public void deletePatient(UUID id) {
        patientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found"));

        patientRepository.deleteById(id);
    }

    private void verifyIfPatientIsMinor(Patient patient) {
        int patientAge = Period.between(patient.getDateOfBirth(), LocalDate.now()).getYears();

        if (patientAge < LEGAL_ADULT_AGE) {
            validateResponsibleData(patient);
            if (!patient.isUnderage())
                patient.setUnderage(true);
        }
    }

    private void validateResponsibleData(Patient patient) {
        if (patient.getResponsibleName() == null ||
                patient.getResponsibleEmail() == null ||
                patient.getResponsiblePhoneNumber() == null ||
                patient.getRelationshipDegree() == null) {
            throw new NotAllowedException("The patient is a minor, fill in the guardian's details");
        }
    }

    private static void validateIfEnumExists(PatientDTO dto) {
        try {
            RelationshipDegree.valueOf(dto.relationshipDegree());
        } catch (IllegalArgumentException e) {
            throw new InvalidEnumValueException("Invalid relationship degree: " + dto.relationshipDegree(), e);
        }
    }

}
