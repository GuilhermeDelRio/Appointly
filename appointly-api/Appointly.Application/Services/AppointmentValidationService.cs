using Appointly.Application.Interfaces.Services;
using Appointly.Domain.Entities;
using Appointly.Domain.Exceptions;
using Appointly.Domain.Interfaces.Repository;
using Microsoft.EntityFrameworkCore;

namespace Appointly.Application.Services;

public class AppointmentValidationService : IAppointmentValidationService
{
    
    private readonly IAppointmentRepository _appointmentRepository;
    private readonly ISystemInfoRepository _systemInfoRepository;

    public AppointmentValidationService(IAppointmentRepository appointmentRepository, ISystemInfoRepository systemInfoRepository)
    {
        _appointmentRepository = appointmentRepository;
        _systemInfoRepository = systemInfoRepository;
    }
    
    public async Task ValidateAppointment(DateTime initialDate, DateTime endDate, CancellationToken cancellationToken)
    {
        if (endDate < initialDate)
            throw new InvalidDateException("End date must be after initial date");
        
        IQueryable<SystemInfo> systemInfoQuery = _systemInfoRepository.GetAll(cancellationToken);
        
        int preSetDurationMin = await systemInfoQuery
            .Select(systemInfo => systemInfo.AppointmentDuration)
            .FirstOrDefaultAsync(cancellationToken);
        
        
        if (preSetDurationMin > 0)
        {
            TimeSpan duration = endDate - initialDate;
            
            if (duration.Duration().Minutes != preSetDurationMin)
                throw new OutOfRangeException($"Appointment should last {preSetDurationMin} minutes.");
        }
        
        if (await _appointmentRepository.GetAppointmentsInInterval(initialDate, endDate) > 0)
        {
            throw new DuplicateDataException(
                $"There is already an appointment at the specified time {initialDate} to {endDate}.");
        }
    }
}