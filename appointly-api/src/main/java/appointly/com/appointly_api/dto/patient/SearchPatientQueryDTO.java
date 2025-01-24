package appointly.com.appointly_api.dto.patient;

import java.time.LocalDate;

public record SearchPatientQueryDTO(
        String firstName,
        String surname,
        LocalDate dateOfBirth,
        String email,
        Boolean specialPatient,
        Boolean underage,
        String responsibleName,
        String responsibleEmail,
        Integer page,
        Integer pageSize
) {
    public SearchPatientQueryDTO {
        page = (page == null) ? 0 : page;
        pageSize = (pageSize == null) ? 10 : pageSize;
    }
}