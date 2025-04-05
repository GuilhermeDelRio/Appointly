using Appointly.Domain.Entities;
using Appointly.Domain.Interfaces.Repository;
using Appointly.Persistence.Context;
using Appointly.Persistence.Repository.Common;
using Microsoft.EntityFrameworkCore;

namespace Appointly.Persistence.Repository;

public class AppointmentRepository : BaseRepository<Appointment>, IAppointmentRepository
{
    public AppointmentRepository(AppDbContext context) : base(context) { }

    public async Task<int> GetAppointmentsInInterval(DateTime initialDate, DateTime endDate)
    {
        return await _context.Appointments
            .Where(a => a.InitialDate < endDate && a.EndDate > initialDate)
            .CountAsync();
    }
}