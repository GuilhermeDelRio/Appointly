namespace Appointly.Application.Dtos.SystemInfo;

public record SystemInfoResponseDTO
{
    public Guid Id { get; set; }
    public int AppointmentDuration { get; set; }
}