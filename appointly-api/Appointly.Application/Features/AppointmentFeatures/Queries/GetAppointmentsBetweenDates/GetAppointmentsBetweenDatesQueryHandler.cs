using Appointly.Application.Abstractions;
using Appointly.Application.Dtos.AppointmentDTOs;
using Appointly.Domain.Entities;
using Appointly.Domain.Interfaces.Repository;
using Microsoft.EntityFrameworkCore;

namespace Appointly.Application.Features.AppointmentFeatures.Queries.GetAppointmentsBetweenDates;

public class GetAppointmentsBetweenDatesQueryHandler : IQueryHandler<GetAppointmentsBetweenDatesQuery, List<AppointmentResponseDTO>>
{
    private readonly IAppointmentRepository _appointmentRepository;
    
    public GetAppointmentsBetweenDatesQueryHandler(IAppointmentRepository appointmentRepository)
    {
        _appointmentRepository = appointmentRepository;
    }
    
    public async Task<List<AppointmentResponseDTO>> Handle(GetAppointmentsBetweenDatesQuery query, CancellationToken cancellation)
    {
        IQueryable<Appointment> appointmentsQuery = _appointmentRepository.GetAll(cancellation);
        
        return await appointmentsQuery
            .Where(a => a.InitialDate >= query.StartDate && a.EndDate <= query.EndDate)
            .Select(a => new AppointmentResponseDTO
            {
                Id = a.Id,
                InitialDate = a.InitialDate,
                EndDate = a.EndDate,
                AppointmentStatus = a.AppointmentStatus.ToString(),
                AppointmentLocation = a.AppointmentLocation.ToString(),
                Patient = a.Patient
            })
            .ToListAsync(cancellation);
    }
}