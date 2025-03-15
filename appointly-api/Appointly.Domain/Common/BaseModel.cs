#nullable disable
namespace Appointly.Domain.Common;

public class BaseModel
{
    public Guid Id { get; set; }
    public DateTime DateCreated { get; set; } = DateTime.UtcNow;
    public DateTime? DateUpdated { get; set; }
    public DateTime? DateDeleted { get; set; }
    public bool IsDeleted { get; set; } = false;
}