package appointly.com.appointly_api.validators;

import appointly.com.appointly_api.exceptions.DuplicateDataException;
import appointly.com.appointly_api.exceptions.NotAllowedException;
import appointly.com.appointly_api.repository.AppointmentRepository;
import appointly.com.appointly_api.repository.SystemInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class AppointmentValidator {

    public final AppointmentRepository appointmentRepository;
    public final SystemInfoRepository systemInfoRepository;

    public void validateAppointment(LocalDateTime initialDate, LocalDateTime finalDate) {

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
