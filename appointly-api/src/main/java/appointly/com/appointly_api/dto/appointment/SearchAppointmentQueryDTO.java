package appointly.com.appointly_api.dto.appointment;

import appointly.com.appointly_api.model.enums.AppointmentStatus;

import java.time.LocalDateTime;

public record SearchAppointmentQueryDTO(
        LocalDateTime initialDate,
        LocalDateTime finalDate,
        AppointmentStatus appointmentStatus,
        Integer page,
        Integer pageSize
) {
    public SearchAppointmentQueryDTO {
        page = (page == null) ? 0 : page;
        pageSize = (pageSize == null) ? 10 : pageSize;
    }
}
