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
    string? RelationshipDegree) { }