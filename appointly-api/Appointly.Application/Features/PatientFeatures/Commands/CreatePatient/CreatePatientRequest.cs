using MediatR;

namespace Appointly.Application.Features.PatientFeatures.Commands.CreatePatient;

public sealed record CreatePatientRequest(
    string FirstName,
    string LastName,
    DateTime DateOfBirth,
    string PhoneNumber,
    string Email,
    decimal Fee,
    bool IsSpecialPatient,
    bool IsUnderage,
    
    string ResponsibleName,
    string ResponsibleEmail,
    string ResponsiblePhoneNumber,
    string RelationshipDegree) : IRequest<CreatePatientResponse>;
