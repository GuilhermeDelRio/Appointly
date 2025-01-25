package appointly.com.appointly_api.service;

import appointly.com.appointly_api.controller.mappers.AppointmentMapper;
import appointly.com.appointly_api.dto.appointment.AppointmentDTO;
import appointly.com.appointly_api.dto.appointment.ReadAppointmentDTO;
import appointly.com.appointly_api.dto.appointment.SearchAppointmentQueryDTO;
import appointly.com.appointly_api.model.Appointment;
import appointly.com.appointly_api.model.enums.AppointmentStatus;
import appointly.com.appointly_api.repository.AppointmentRepository;
import appointly.com.appointly_api.repository.specs.AppointmentSpecifications;
import appointly.com.appointly_api.utils.EnumUtils;
import appointly.com.appointly_api.validators.AppointmentValidator;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final AppointmentMapper mapper;
    private final AppointmentValidator validator;

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

    public Page<ReadAppointmentDTO> searchAppointment(SearchAppointmentQueryDTO query) {

        Specification<Appointment> specs = Specification
                .where((root, query1, cb) -> cb.conjunction());

        if (query.appointmentStatus() != null) {
            specs = specs.and(AppointmentSpecifications
                    .appointmentStatusEqual(query.appointmentStatus()));
        }

        if (query.initialDate() != null && query.finalDate() != null) {
            specs = specs.and(AppointmentSpecifications
                    .betweenInitialDateAndFinalDate(query.initialDate(), query.finalDate()));
        }

        if (query.initialDate() != null && query.finalDate() == null) {
            specs = specs.and(AppointmentSpecifications.initialDateEquals(query.initialDate()));
        }

        Pageable pageRequest = PageRequest.of(query.page(), query.pageSize());

        return appointmentRepository
                .findAll(specs, pageRequest)
                .map(mapper::toDTO);
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
