using Appointly.Domain.Entities;

namespace Appointly.Domain.Interfaces.Services;

public interface IPatientValidationService
{
    void ValidatePatientData(Patient patient);
}