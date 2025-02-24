using Appointly.Domain.Entities;

namespace Appointly.Application.Interfaces.Services;

public interface IPatientValidationService
{
    Task ValidatePatientData(Patient patient);
}