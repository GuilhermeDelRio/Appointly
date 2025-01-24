package appointly.com.appointly_api.repository;

import appointly.com.appointly_api.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;
import java.util.UUID;

public interface PatientRepository extends JpaRepository<Patient, UUID>, JpaSpecificationExecutor<Patient> {
    Optional<Patient> findByFirstNameIgnoreCaseAndSurnameIgnoreCase(String firstName, String surname);
}
