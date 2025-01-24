package appointly.com.appointly_api.repository.specs;

import appointly.com.appointly_api.model.Patient;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class PatientSpecifications {

    public static Specification<Patient> firstNameLike(String firstName) {
        return ((root, query, cb)
                -> cb.like(cb.upper(root.get("firstName")), "%" + firstName.toUpperCase() + "%") );
    }

    public static Specification<Patient> surnameLike(String surname) {
        return ((root, query, cb)
                -> cb.like(cb.upper(root.get("surname")), "%" + surname.toUpperCase() + "%") );
    }

    public static Specification<Patient> emailLike(String email) {
        return ((root, query, cb)
                -> cb.like(cb.upper(root.get("email")), "%" + email.toUpperCase() + "%") );
    }

    public static Specification<Patient> specialPatientEqual(Boolean specialPatient) {
        return ((root, query, cb) ->
                specialPatient == null ? null : cb.equal(root.get("specialPatient"), specialPatient));
    }

    public static Specification<Patient> underageEqual(Boolean underage) {
        return ((root, query, cb) ->
                underage == null ? null : cb.equal(root.get("underage"), underage));
    }

    public static Specification<Patient> responsibleNameLike(String responsibleName) {
        return ((root, query, cb)
                -> cb.like(cb.upper(root.get("responsibleName")), "%" + responsibleName.toUpperCase() + "%") );
    }

    public static Specification<Patient> responsibleEmailLike(String responsibleEmail) {
        return ((root, query, cb)
                -> cb.like(cb.upper(root.get("responsibleEmail")), "%" + responsibleEmail.toUpperCase() + "%") );
    }

    public static Specification<Patient> dateOfBirthEquals(LocalDate dateOfBirth) {
        return (root, query, criteriaBuilder) ->
                dateOfBirth == null ? null : criteriaBuilder.equal(root.get("dateOfBirth"), dateOfBirth);
    }

}
