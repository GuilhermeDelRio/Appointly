package appointly.com.appointly_api.repository;

import appointly.com.appointly_api.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PatientRepository extends JpaRepository<Patient, UUID> {
    Optional<Patient> findByFirstNameIgnoreCaseAndSurnameIgnoreCase(String firstName, String surname);
}
