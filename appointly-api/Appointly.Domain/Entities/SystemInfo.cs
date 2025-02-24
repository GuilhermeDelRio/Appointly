using Appointly.Domain.Common;

namespace Appointly.Domain.Entities;

public class SystemInfo : BaseModel
{
    public int AppointmentDuration { get; set; }
}