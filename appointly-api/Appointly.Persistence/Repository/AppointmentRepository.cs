using Appointly.Domain.Entities;
using Appointly.Domain.Interfaces.Repository;
using Appointly.Persistence.Context;
using Appointly.Persistence.Repository.Common;

namespace Appointly.Persistence.Repository;

public class AppointmentRepository : BaseRepository<Appointment>, IAppointmentRepository
{
    public AppointmentRepository(AppDbContext context) : base(context) { }

    public async Task<int> GetAppointmentsInInterval(DateTime initialDate, DateTime endDate)
    {
        // var filter = Builders<Appointment>.Filter.And(
        //     Builders<Appointment>.Filter.Lt(a => a.InitialDate, endDate),
        //     Builders<Appointment>.Filter.Gt(a => a.EndDate, initialDate)
        // );
        //
        // return (int)await _collection.CountDocumentsAsync(filter);
        throw new NotImplementedException();
    }
}