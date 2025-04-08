namespace Appointly.Application.Features.AppointmentFeatures.Commands.UpdateAppointmentByDate;

public record UpdateAppointmentByDateCommand(Guid Id, DateTime InitialDate, DateTime EndDate, Guid PatientId);