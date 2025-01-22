package appointly.com.appointly_api.repository;

import appointly.com.appointly_api.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.UUID;

public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {

    @Query(value = """
        SELECT COUNT(ts) FROM tb_appointment ts
        WHERE :initialDate < ts.final_date and :finalDate > ts.initial_date
        """, nativeQuery = true)
    int findAppointmentsInInterval(@Param("initialDate") LocalDateTime initialDate,
              @Param("finalDate") LocalDateTime finalDate);
}
