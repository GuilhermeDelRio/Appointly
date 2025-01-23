package appointly.com.appointly_api.service;

import appointly.com.appointly_api.controller.mappers.AppointmentMapper;
import appointly.com.appointly_api.dto.appointment.CreateAppointmentDTO;
import appointly.com.appointly_api.exceptions.DuplicateDataException;
import appointly.com.appointly_api.exceptions.NotAllowedException;
import appointly.com.appointly_api.model.Appointment;
import appointly.com.appointly_api.model.enums.AppointmentStatus;
import appointly.com.appointly_api.repository.AppointmentRepository;
import appointly.com.appointly_api.repository.SystemInfoRepository;
import appointly.com.appointly_api.utils.EnumUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final SystemInfoRepository systemInfoRepository;
    private final AppointmentMapper mapper;

    public Appointment createNewAppointment(CreateAppointmentDTO dto) {

        EnumUtils.validateIfEnumExists(AppointmentStatus.class, dto.appointmentStatus());

        validateAppointment(dto.initialDate(), dto.finalDate());
        Appointment appointment = mapper.toEntity(dto);
        return appointmentRepository.save(appointment);
    }

    private void validateAppointment(LocalDateTime initialDate, LocalDateTime finalDate) {

        if (finalDate.isBefore(initialDate)) {
            throw new IllegalArgumentException("Final date must be after initial date");
        }

        int preSetDurationMin = systemInfoRepository.findAppointmentDuration();
        if (preSetDurationMin > 0) {
            Duration durationRequested = Duration.between(initialDate, finalDate);
            long durationInMin = durationRequested.toMinutes();

            if (durationInMin != preSetDurationMin)
                throw new NotAllowedException(String.format("Appointment should last %d minutes", preSetDurationMin));
        }

        if (appointmentRepository.findAppointmentsInInterval(initialDate, finalDate) > 0) {
            throw new DuplicateDataException(String.format("There is already an appointment at the specified time (%s to %s)",
                    initialDate, finalDate));
        }
    }
}
