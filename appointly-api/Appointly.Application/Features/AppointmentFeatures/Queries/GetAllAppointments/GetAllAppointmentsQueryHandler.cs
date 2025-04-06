using Appointly.Application.Abstractions;
using Appointly.Application.Dtos.AppointmentDTOs;
using Appointly.Application.Dtos.Common;
using Appointly.Domain.Entities;
using Appointly.Domain.Interfaces.Repository;
using Microsoft.EntityFrameworkCore;

namespace Appointly.Application.Features.AppointmentFeatures.Queries.GetAllAppointments;

public class GetAllAppointmentsQueryHandler : IQueryHandler<GetAllAppointmentsQuery, PageResponse<AppointmentResponseDTO>>
{
    private readonly IAppointmentRepository _appointmentRepository;
    
    public GetAllAppointmentsQueryHandler(IAppointmentRepository appointmentRepository)
    {
        _appointmentRepository = appointmentRepository;
    }
    
    public async Task<PageResponse<AppointmentResponseDTO>> Handle(GetAllAppointmentsQuery query, CancellationToken cancellationToken)
    {
        IQueryable<Appointment> appointmentsQuery = _appointmentRepository.GetAll(cancellationToken);
        
        if (!string.IsNullOrWhiteSpace(query.searchTerm))
        {
            appointmentsQuery = appointmentsQuery.Where(a => 
                a.Patient.FirstName.Contains(query.searchTerm, StringComparison.CurrentCultureIgnoreCase) || 
                a.Patient.LastName.Contains(query.searchTerm, StringComparison.CurrentCultureIgnoreCase));
        }
        
        int totalCount = appointmentsQuery.Count();
        
        List<AppointmentResponseDTO> appointments = await appointmentsQuery
            .Skip((query.page - 1) * query.pageSize)
            .Take(query.pageSize)
            .Select(a => new AppointmentResponseDTO
            {
                Id = a.Id,
                InitialDate = a.InitialDate,
                EndDate = a.EndDate,
                AppointmentStatus = a.AppointmentStatus.ToString(),
                AppointmentLocation = a.AppointmentLocation.ToString(),
                PatientId = a.PatientId
            })
            .ToListAsync(cancellationToken);

        return new PageResponse<AppointmentResponseDTO>
        {
            Items = appointments,
            TotalCount = totalCount
        };
    }
}