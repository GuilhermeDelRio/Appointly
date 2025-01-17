package appointly.com.appointly_api.service;

import appointly.com.appointly_api.controller.mappers.PatientMapper;
import appointly.com.appointly_api.dto.patient.GetPatientDTO;
import appointly.com.appointly_api.dto.patient.PatientDTO;
import appointly.com.appointly_api.model.Patient;
import appointly.com.appointly_api.repository.PatientRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;
    private final PatientMapper mapper;

    public Patient createPatient(PatientDTO dto) {
        Patient patient = mapper.toEntity(dto);
        return patientRepository.save(patient);
    }

    public GetPatientDTO getPatientById(UUID id) {
        return patientRepository.findById(id)
                .map(mapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found"));
    }

    public void updatePatient(UUID id, @Valid PatientDTO dto) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found"));

        mapper.updatePatientFromDto(dto, patient);
        patientRepository.save(patient);
    }

    public void deletePatient(UUID id) {
        patientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found"));

        patientRepository.deleteById(id);
    }
}
