using Appointly.Application.Interfaces.Services;
using Appointly.Domain.Entities;
using Appointly.Domain.Exceptions;
using Appointly.Domain.Interfaces.Repository;

namespace Appointly.Application.Services;

public class PatientValidationService : IPatientValidationService
{
    private readonly IPatientRepository _patientRepository;
    private const int LEGAL_ADULT_AGE = 18;

    public PatientValidationService(IPatientRepository patientRepository)
    {
        _patientRepository = patientRepository;
    }

    public async Task ValidatePatientData(Patient patient)
    {
        var patientExists = await CheckIfPatientAlreadyExists(patient.FirstName, patient.LastName);

        if (patientExists) throw new DuplicateDataException("Already exists a patient with the same first name and last name.");
        
        var patientAge = CalculateExactAge(patient.DateOfBirth);

        if (patientAge.Years >= LEGAL_ADULT_AGE && !patient.HasAResponsible) return;
        if (!patient.HasAResponsible) patient.HasAResponsible = true;
        
        validateResponsibleData(patient);
    }

    private async Task<bool> CheckIfPatientAlreadyExists(string  firstName, string lastName)
    {
        return await _patientRepository.FindByFirstNameAndLastName(firstName, lastName);
    }

    private static void validateResponsibleData(Patient patient)
    {
        if (patient.ResponsibleName is null ||
            patient.ResponsibleEmail is null || 
            patient.ResponsiblePhoneNumber is null || 
            patient.RelationshipDegree is null)
        {
            throw new NotFilledFieldsException("Responsible fields are not filled.");
        }
    }
    
    private static (int Years, int Months, int Days) CalculateExactAge(DateTime birthDate)
    {
        var currentDate = DateTime.Now;
        
        var years = currentDate.Year - birthDate.Year;
        var months = currentDate.Month - birthDate.Month;
        var days = currentDate.Day - birthDate.Day;
        
        if (days < 0)
        {
            months--;
            days += DateTime.DaysInMonth(currentDate.Year, currentDate.Month);
        }

        if (months < 0)
        {
            years--;
            months += 12;
        }

        return (years, months, days);
    }

}