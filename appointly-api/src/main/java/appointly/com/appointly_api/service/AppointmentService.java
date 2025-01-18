package appointly.com.appointly_api.service;

import appointly.com.appointly_api.controller.mappers.AppointmentMapper;
import appointly.com.appointly_api.dto.appointment.CreateAppointmentDTO;
import appointly.com.appointly_api.model.Appointment;
import appointly.com.appointly_api.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final AppointmentMapper mapper;

    public Appointment createNewAppointment(CreateAppointmentDTO dto) {
        Appointment appointment = mapper.toEntity(dto);
        return appointmentRepository.save(appointment);
    }
}
