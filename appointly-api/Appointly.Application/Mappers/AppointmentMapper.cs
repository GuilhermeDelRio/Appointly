using Appointly.Application.Dtos.AppointmentDTOs;
using Appointly.Domain.Entities;
using Appointly.Domain.Enums;

namespace Appointly.Application.Mappers;

public static class AppointmentMapper
{
    public static Appointment ToEntity(this AppointmentRequestDTO dto)
    {
        return new Appointment
        {
            InitialDate = dto.InitialDate,
            EndDate = dto.EndDate,
            PatientId = dto.PatientId,
            AppointmentStatus = Enum.Parse<AppointmentStatus>(dto.AppointmentStatus),
            AppointmentLocation = Enum.Parse<AppointmentLocation>(dto.AppointmentLocation)
        };
    }
    
    public static AppointmentResponseDTO ToDto(this Appointment appointment)
    {
        return new AppointmentResponseDTO
        {
            Id = appointment.Id,
            InitialDate = appointment.InitialDate,
            EndDate = appointment.EndDate,
            AppointmentStatus = appointment.AppointmentStatus.ToString(),
            AppointmentLocation = appointment.AppointmentLocation.ToString(),
            Patient = appointment.Patient
        };
    }
    
    public static void UpdateEntity(this AppointmentRequestDTO dto, Appointment appointment)
    {
        appointment.InitialDate = dto.InitialDate;
        appointment.EndDate = dto.EndDate;
        appointment.PatientId = dto.PatientId;
        appointment.AppointmentStatus = Enum.Parse<AppointmentStatus>(dto.AppointmentStatus);
        appointment.AppointmentLocation = Enum.Parse<AppointmentLocation>(dto.AppointmentLocation);
    }
}