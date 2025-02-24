using Appointly.Domain.Entities;

namespace Appointly.Domain.Interfaces.Repository;

public interface IAppointmentRepository : IBaseRepository<Appointment>
{
    Task<int> GetAppointmentsInInterval(DateTime initialDate, DateTime endDate);
}