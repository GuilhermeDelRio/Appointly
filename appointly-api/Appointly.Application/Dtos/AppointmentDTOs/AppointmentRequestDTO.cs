namespace Appointly.Application.Dtos.AppointmentDTOs;

public record AppointmentRequestDTO(
    DateTime InitialDate,
    DateTime EndDate,
    string AppointmentStatus,
    string AppointmentLocation,
    Guid PatientId
    ) { }