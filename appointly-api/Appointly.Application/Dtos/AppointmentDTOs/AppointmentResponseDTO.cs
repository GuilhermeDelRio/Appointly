#nullable disable

using Appointly.Domain.Entities;

namespace Appointly.Application.Dtos.AppointmentDTOs;

public record AppointmentResponseDTO
{
    public Guid Id { get; set; }
    public DateTime InitialDate { get; set; }
    public DateTime EndDate { get; set; }
    public string AppointmentStatus { get; set; }
    public string AppointmentLocation { get; set; }
    public Patient Patient { get; set; }
}