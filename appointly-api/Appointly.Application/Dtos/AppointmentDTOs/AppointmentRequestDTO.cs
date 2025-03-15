using Appointly.Domain.Entities;
using Appointly.Domain.Enums;
using MediatR;

namespace Appointly.Application.Dtos.AppointmentDTOs;

public record AppointmentRequestDTO(
    DateTime InitialDate,
    DateTime EndDate,
    string AppointmentStatus,
    Guid PatientId
    ) : IRequest<Unit>
{
    public Appointment ToEntity()
    {
        return new Appointment
        {
            InitialDate = InitialDate,
            EndDate = EndDate,
            PatientId = PatientId,
            AppointmentStatus = Enum.Parse<AppointmentStatus>(AppointmentStatus)
        };
    }
}