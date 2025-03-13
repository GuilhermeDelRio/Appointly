using Appointly.Domain.Entities;
using Appointly.Domain.Interfaces.Repository;
using Appointly.Persistence.Context;
using Appointly.Persistence.Repository.Common;

namespace Appointly.Persistence.Repository;

public class SystemInfoRepository : BaseRepository<SystemInfo>, ISystemInfoRepository
{
    public SystemInfoRepository(AppDbContext context) : base(context) { }
}