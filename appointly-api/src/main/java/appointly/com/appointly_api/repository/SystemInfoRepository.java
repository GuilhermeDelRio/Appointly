package appointly.com.appointly_api.repository;

import appointly.com.appointly_api.model.SystemInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface SystemInfoRepository extends JpaRepository<SystemInfo,UUID> {
    @Query(value = "select ts.appointment_duration from tb_systeminfo ts LIMIT 1", nativeQuery = true)
    Integer findAppointmentDuration();
}
