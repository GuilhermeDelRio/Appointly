using Appointly.Domain.Common;
using Appointly.Domain.Enums;

namespace Appointly.Domain.Entities;

public class Patient : BaseModel
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public decimal Fee { get; set; }
    public bool IsSpecialPatient { get; set; }
    public bool HasAResponsible { get; set; }
    
    // criar entidade reposponsible
    public string? ResponsibleName { get; set; }
    public string? ResponsibleEmail { get; set; }
    public string? ResponsiblePhoneNumber { get; set; }
    public RelationshipDegree? RelationshipDegree { get; set; }
    
    public List<Appointment> Appointments { get; set; }
}