using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Appointly.Domain.Common;

public class BaseModel
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = ObjectId.GenerateNewId().ToString();
    public DateTimeOffset DateCreated { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? DateUpdated { get; set; }
    public DateTimeOffset? DateDeleted { get; set; }
    public bool IsDeleted { get; set; } = false;
}