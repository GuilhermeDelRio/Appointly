package appointly.com.appointly_api.service;

import appointly.com.appointly_api.model.Patient;
import appointly.com.appointly_api.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;

    public Patient create(Patient patient) {
        return patientRepository.save(patient);
    }

    public Optional<Patient> getById(UUID id) {
        return patientRepository.findById(id);
    }

    public void update(Patient patient) {
        patientRepository.save(patient);
    }

    public void delete(UUID id) {
        patientRepository.deleteById(id);
    }
}
