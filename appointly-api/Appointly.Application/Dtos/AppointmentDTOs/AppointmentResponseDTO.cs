using Appointly.Domain.Enums;

namespace Appointly.Application.Dtos.AppointmentDTOs;

public record AppointmentResponseDTO
{
    public string Id { get; set; }
    public DateTime InitialDate { get; set; }
    public DateTime EndDate { get; set; }
    public AppointmentStatus AppointmentStatus { get; set; }
    public string PatientId { get; set; }
}