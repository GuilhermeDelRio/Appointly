#nullable disable
using Appointly.Domain.Common;
using Appointly.Domain.Enums;

namespace Appointly.Domain.Entities;

public class Appointment : BaseModel
{
    public DateTime InitialDate { get; set; }
    public DateTime EndDate { get; set; }
    public AppointmentStatus AppointmentStatus { get; set; }
    // public AppointmentLocation AppointmentLocation { get; set; }
    public Guid PatientId { get; set; }
    public Patient Patient { get; set; }
}