using Appointly.Domain.Entities;
using Appointly.Domain.Interfaces.Repository;
using Appointly.Persistence.Repository.Common;
using MongoDB.Driver;

namespace Appointly.Persistence.Repository;

public class SystemInfoRepository : BaseRepository<SystemInfo>, ISystemInfoRepository
{
    public SystemInfoRepository(IMongoDatabase database) : base(database, "systemInfo") { }
}