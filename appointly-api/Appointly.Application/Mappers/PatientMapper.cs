using Appointly.Application.Dtos.PatientDTOs;
using Appointly.Application.Features.PatientFeatures.Commands.UpdatePatient;
using Appointly.Domain.Entities;
using Appointly.Domain.Enums;

namespace Appointly.Application.Mappers;

public static class PatientMapper
{
    public static Patient ToEntity(this PatientRequestDTO dto)
    {
        return new Patient()
        {
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            DateOfBirth = dto.DateOfBirth,
            PhoneNumber = dto.PhoneNumber,
            Email = dto.Email,
            Fee = dto.Fee,
            IsSpecialPatient = dto.IsSpecialPatient,
            HasAResponsible = dto.HasAResponsible,
            ResponsibleName = dto.ResponsibleName,
            ResponsibleEmail = dto.ResponsibleEmail,
            ResponsiblePhoneNumber = dto.ResponsiblePhoneNumber,
            RelationshipDegree = Enum.TryParse(dto.RelationshipDegree?.Trim(), true, out RelationshipDegree degree) ? degree : null
        };
    }
    
    public static PatientResponseDTO ToDto(this Patient patient)
    {
        return new PatientResponseDTO
        {
            Id = patient.Id,
            FirstName = patient.FirstName,
            LastName = patient.LastName,
            DateOfBirth = patient.DateOfBirth,
            PhoneNumber = patient.PhoneNumber,
            Email = patient.Email,
            Fee = patient.Fee,
            IsSpecialPatient = patient.IsSpecialPatient,
            HasAResponsible = patient.HasAResponsible,
            ResponsibleName = patient.ResponsibleName,
            ResponsibleEmail = patient.ResponsibleEmail,
            ResponsiblePhoneNumber = patient.ResponsiblePhoneNumber,
            RelationshipDegree = patient.RelationshipDegree.ToString()
        };
    }
    
    public static void UpdateEntity(this UpdatePatientCommand dto, Patient patient)
    {
        patient.FirstName = dto.FirstName;
        patient.LastName = dto.LastName;
        patient.DateOfBirth = dto.DateOfBirth;
        patient.PhoneNumber = dto.PhoneNumber;
        patient.Email = dto.Email;
        patient.Fee = dto.Fee;
        patient.IsSpecialPatient = dto.IsSpecialPatient;
        patient.HasAResponsible = dto.HasAResponsible;
        patient.ResponsibleName = dto.ResponsibleName;
        patient.ResponsibleEmail = dto.ResponsibleEmail;
        patient.ResponsiblePhoneNumber = dto.ResponsiblePhoneNumber;
        patient.RelationshipDegree = Enum.TryParse(dto.RelationshipDegree?.Trim(), true, out RelationshipDegree degree) ? degree : null;
    }
}