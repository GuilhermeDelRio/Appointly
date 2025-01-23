package appointly.com.appointly_api.dto.appointment;

import appointly.com.appointly_api.dto.patient.GetPatientDTO;
import appointly.com.appointly_api.model.enums.AppointmentStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public record ReadAppointmentDTO(
        UUID id,
        LocalDateTime initialDate,
        LocalDateTime finalDate,
        AppointmentStatus appointmentStatus,
        GetPatientDTO patient
    ){
}
