using Appointly.Domain.Entities;
using Appointly.Domain.Enums;
using MediatR;

namespace Appointly.Application.Dtos.PatientDTOs;

public sealed record PatientRequestDTO(
    string FirstName,
    string LastName,
    DateTime DateOfBirth,
    string PhoneNumber,
    string Email,
    decimal Fee,
    bool IsSpecialPatient,
    bool HasAResponsible,
    string? ResponsibleName,
    string? ResponsibleEmail,
    string? ResponsiblePhoneNumber,
    string? RelationshipDegree) : IRequest<PatientResponseDTO>
{
    public Patient ToEntity()
    {
        return new Patient
        {
            FirstName = FirstName,
            LastName = LastName,
            DateOfBirth = DateOfBirth,
            PhoneNumber = PhoneNumber,
            Email = Email,
            Fee = Fee,
            IsSpecialPatient = IsSpecialPatient,
            HasAResponsible = HasAResponsible,
            ResponsibleName = ResponsibleName,
            ResponsibleEmail = ResponsibleEmail,
            ResponsiblePhoneNumber = ResponsiblePhoneNumber,
            RelationshipDegree = Enum.TryParse(RelationshipDegree?.Trim(), true, out RelationshipDegree degree) ? degree : null
        };
    }
}