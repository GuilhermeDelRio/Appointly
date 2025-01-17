package appointly.com.appointly_api.controller.mappers;

import appointly.com.appointly_api.dto.patient.PatientDTO;
import appointly.com.appointly_api.dto.patient.GetPatientDTO;
import appointly.com.appointly_api.model.Patient;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PatientMapper {
    Patient toEntity(PatientDTO dto);
    GetPatientDTO toDTO(Patient patient);
    void updatePatientFromDto(PatientDTO dto, @MappingTarget Patient patient);
}
