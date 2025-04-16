using Appointly.Application.Abstractions;
using Appointly.Application.Dtos.SystemInfo;
using Appointly.Domain.Entities;
using Appointly.Domain.Exceptions;
using Appointly.Domain.Interfaces.Repository;
using Microsoft.EntityFrameworkCore;

namespace Appointly.Application.Features.SystemInfoFeature.Queries.GetAllSystemInfo;

public class GetAllSystemInfoQueryHandler :  IQueryHandler<GetAllSystemInfoQuery, SystemInfoResponseDTO>
{
    
    private readonly ISystemInfoRepository _systemInfoRepository;
    
    public GetAllSystemInfoQueryHandler(ISystemInfoRepository systemInfoRepository)
    {
        _systemInfoRepository = systemInfoRepository;
    }
    
    public async Task<SystemInfoResponseDTO> Handle(GetAllSystemInfoQuery query, CancellationToken cancellation)
    {
        IQueryable<SystemInfo> systemInfoQuery = _systemInfoRepository.GetAll(cancellation);

        var result =  await systemInfoQuery
            .Select(s => new SystemInfoResponseDTO
            {
                Id = s.Id,
                AppointmentDuration = s.AppointmentDuration
            })
            .FirstOrDefaultAsync(cancellation);

        if (result == null) throw new NotFoundException("The system info could not be found.");
        
        return result!;
    }
}