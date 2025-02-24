using Appointly.Domain.Entities;
using Appointly.Domain.Interfaces.Repository;
using Appointly.Persistence.Repository.Common;
using MongoDB.Driver;

namespace Appointly.Persistence.Repository;

public class AppointmentRepository : BaseRepository<Appointment>, IAppointmentRepository
{
    public AppointmentRepository(IMongoDatabase database) : base(database, "appointments") { }

    public async Task<int> GetAppointmentsInInterval(DateTime initialDate, DateTime endDate)
    {
        var filter = Builders<Appointment>.Filter.And(
            Builders<Appointment>.Filter.Lt(a => a.InitialDate, endDate),
            Builders<Appointment>.Filter.Gt(a => a.EndDate, initialDate)
        );

        return (int)await _collection.CountDocumentsAsync(filter);
    }
}