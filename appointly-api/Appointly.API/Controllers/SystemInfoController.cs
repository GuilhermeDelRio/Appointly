using Appointly.Application.Abstractions;
using Appointly.Application.Dtos.SystemInfo;
using Appointly.Application.Features.SystemInfoFeature.Queries.GetAllSystemInfo;
using Microsoft.AspNetCore.Mvc;

namespace Appointly.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SystemInfoController : ControllerBase
{
    private readonly IQueryDispatcher _queryDispatcher;

    public SystemInfoController(IQueryDispatcher queryDispatcher)
    {
        _queryDispatcher = queryDispatcher;
    }
    
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<SystemInfoResponseDTO>> GetAllSystemInfo(CancellationToken cancellationToken)
    {
        var result = await _queryDispatcher
            .Dispatch<GetAllSystemInfoQuery, SystemInfoResponseDTO>(
                new GetAllSystemInfoQuery(), cancellationToken);
        
        return Ok(result);
    }
}