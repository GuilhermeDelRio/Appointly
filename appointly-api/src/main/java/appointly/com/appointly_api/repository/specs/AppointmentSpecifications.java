package appointly.com.appointly_api.repository.specs;

import appointly.com.appointly_api.model.Appointment;
import appointly.com.appointly_api.model.enums.AppointmentStatus;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;

public class AppointmentSpecifications {
    public static Specification<Appointment> appointmentStatusEqual(AppointmentStatus appointmentStatus) {
        return (root, query, cb)
                -> cb.equal(root.get("appointmentStatus"), appointmentStatus);
    }

    public static Specification<Appointment> initialDateEquals(LocalDateTime initialDate) {
        return (root, query, criteriaBuilder) ->
                initialDate == null ? null : criteriaBuilder.equal(root.get("initialDate"), initialDate);
    }

    public static Specification<Appointment> betweenInitialDateAndFinalDate(
            LocalDateTime initialDate,
            LocalDateTime finalDate) {
        return (root, query, cb) -> cb.and(
                cb.greaterThanOrEqualTo(root.get("initialDate"), initialDate),
                cb.lessThanOrEqualTo(root.get("finalDate"), finalDate)
        );
    }
}
