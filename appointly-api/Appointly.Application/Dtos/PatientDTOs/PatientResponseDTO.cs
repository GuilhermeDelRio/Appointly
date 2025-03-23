#nullable disable
using Appointly.Domain.Entities;

namespace Appointly.Application.Dtos.PatientDTOs;

public record PatientResponseDTO
{
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public decimal Fee { get; set; }
    public bool IsSpecialPatient { get; set; }
    public bool HasAResponsible { get; set; }
    
    public string ResponsibleName { get; set; }
    public string ResponsibleEmail { get; set; }
    public string ResponsiblePhoneNumber { get; set; }
    public string RelationshipDegree { get; set; }
}