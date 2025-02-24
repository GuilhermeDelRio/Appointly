#nullable disable
using Appointly.Domain.Common;
using Appointly.Domain.Enums;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Appointly.Domain.Entities;

public class Appointment : BaseModel
{
    public DateTime InitialDate { get; set; }
    public DateTime EndDate { get; set; }
    public AppointmentStatus AppointmentStatus { get; set; }
    
    [BsonRepresentation(BsonType.ObjectId)]
    public string PatientId { get; set; }
}