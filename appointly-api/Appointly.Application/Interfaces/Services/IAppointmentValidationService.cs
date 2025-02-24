namespace Appointly.Application.Interfaces.Services;

public interface IAppointmentValidationService
{
    Task ValidateAppointment(DateTime initialDate, DateTime endDate, CancellationToken cancellationToken);
}