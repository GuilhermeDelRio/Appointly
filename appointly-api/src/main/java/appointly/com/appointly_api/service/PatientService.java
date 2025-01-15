package appointly.com.appointly_api.service;

import appointly.com.appointly_api.dto.patient.PatientDTO;
import appointly.com.appointly_api.model.Patient;
import appointly.com.appointly_api.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;

    public Patient create(Patient patient) {
        return patientRepository.save(patient);
    }
}
