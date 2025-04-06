#nullable disable

namespace Appointly.Application.Dtos.AppointmentDTOs;

public record AppointmentResponseDTO
{
    public Guid Id { get; set; }
    public DateTime InitialDate { get; set; }
    public DateTime EndDate { get; set; }
    public string AppointmentStatus { get; set; }
    public Guid PatientId { get; set; }
}