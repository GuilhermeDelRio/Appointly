package appointly.com.appointly_api.service;

import appointly.com.appointly_api.controller.mappers.PatientMapper;
import appointly.com.appointly_api.dto.patient.GetPatientDTO;
import appointly.com.appointly_api.dto.patient.PatientDTO;
import appointly.com.appointly_api.exceptions.DuplicateDataException;
import appointly.com.appointly_api.model.Patient;
import appointly.com.appointly_api.repository.PatientRepository;
import appointly.com.appointly_api.validators.PatientValidator;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;
    private final PatientValidator patientValidator;
    private final PatientMapper mapper;

    public Patient createPatient(PatientDTO dto) {
        patientValidator.verifyIfPatientIsMinor(dto);

        Patient patient = mapper.toEntity(dto);

        Optional<Patient> alreadyExistsPatient = patientRepository
                .findByFirstNameIgnoreCaseAndSurnameIgnoreCase(patient.getFirstName(), patient.getSurname());

        if (alreadyExistsPatient.isPresent()) {
            throw new DuplicateDataException("Already exists a patient with the same first name and surname.");
        }

        return patientRepository.save(patient);
    }

    public GetPatientDTO getPatientById(UUID id) {
        return patientRepository.findById(id)
                .map(mapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found"));
    }

    public void updatePatient(UUID id, PatientDTO dto) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found"));

        patientValidator.verifyIfPatientIsMinor(dto);

        patientRepository.findByFirstNameIgnoreCaseAndSurnameIgnoreCase(dto.firstName(), dto.surname())
               .ifPresent(existingPatient -> {
                   if (!existingPatient.getId().equals(id)) {
                       throw new DuplicateDataException("Already exists a patient with the same first name and surname.");
                   }
               });

        mapper.updatePatientFromDto(dto, patient);
        patientRepository.save(patient);
    }

    public void deletePatient(UUID id) {
        patientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found"));

        patientRepository.deleteById(id);
    }

}
