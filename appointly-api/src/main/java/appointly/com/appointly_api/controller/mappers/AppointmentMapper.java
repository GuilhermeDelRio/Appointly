package appointly.com.appointly_api.controller.mappers;

import appointly.com.appointly_api.dto.appointment.CreateAppointmentDTO;
import appointly.com.appointly_api.model.Appointment;
import appointly.com.appointly_api.repository.PatientRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring", uses = PatientMapper.class)
public abstract class AppointmentMapper {

    @Autowired
    PatientRepository patientRepository;

    @Mapping(target = "patient", expression = "java( patientRepository.findById(dto.idPatient()).orElse(null) )")
    public abstract Appointment toEntity(CreateAppointmentDTO dto);
}
