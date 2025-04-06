using Appointly.Domain.Entities;
using Appointly.Domain.Enums;
using MediatR;

namespace Appointly.Application.Dtos.AppointmentDTOs;

public record AppointmentRequestDTO(
    DateTime InitialDate,
    DateTime EndDate,
    string AppointmentStatus,
    Guid PatientId
    ) { }