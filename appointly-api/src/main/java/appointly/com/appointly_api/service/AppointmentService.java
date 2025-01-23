package appointly.com.appointly_api.service;

import appointly.com.appointly_api.controller.mappers.AppointmentMapper;
import appointly.com.appointly_api.dto.appointment.ReadAppointmentDTO;
import appointly.com.appointly_api.dto.appointment.AppointmentDTO;
import appointly.com.appointly_api.model.Appointment;
import appointly.com.appointly_api.model.enums.AppointmentStatus;
import appointly.com.appointly_api.repository.AppointmentRepository;
import appointly.com.appointly_api.utils.EnumUtils;
import appointly.com.appointly_api.validators.AppointmentValidator;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final AppointmentMapper mapper;
    public final AppointmentValidator validator;

    public Appointment createNewAppointment(AppointmentDTO dto) {

        EnumUtils.validateIfEnumExists(AppointmentStatus.class, dto.appointmentStatus());

        validator.validateAppointment(dto.initialDate(), dto.finalDate());
        Appointment appointment = mapper.toEntity(dto);
        return appointmentRepository.save(appointment);
    }

    public ReadAppointmentDTO getAppointmentById(UUID id) {
        return appointmentRepository
                .findById(id)
                .map(mapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found"));
    }

    public void updateAppointment(UUID id, AppointmentDTO dto) {
        Appointment appointment = appointmentRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found"));

        EnumUtils.validateIfEnumExists(AppointmentStatus.class, dto.appointmentStatus());
        validator.validateAppointment(dto.initialDate(), dto.finalDate());

        mapper.updateEntityFromDto(dto, appointment);
        appointmentRepository.save(appointment);
    }

    public void deleteAppointment(UUID id) {
        Appointment appointment = appointmentRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found"));

        appointmentRepository.delete(appointment);
    }
}
