using Appointly.Domain.Entities;

namespace Appointly.Domain.Interfaces.Services;

public interface IPatientValidationService
{
    Task ValidatePatientData(Patient patient);
}