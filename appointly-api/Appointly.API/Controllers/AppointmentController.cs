using Appointly.Application.Abstractions;
using Appointly.Application.Dtos.AppointmentDTOs;
using Appointly.Application.Dtos.Common;
using Appointly.Application.Features.AppointmentFeatures.Queries.GetAllAppointments;
using Microsoft.AspNetCore.Mvc;

namespace Appointly.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AppointmentController : ControllerBase
{
    private readonly IQueryDispatcher _queryDispatcher;
    private readonly ICommandDispatcher _commandDispatcher;

    public AppointmentController(IQueryDispatcher queryDispatcher, ICommandDispatcher commandDispatcher)
    {
        _queryDispatcher = queryDispatcher;
        _commandDispatcher = commandDispatcher;
    }
    
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<AppointmentResponseDTO>> CreatePatient(
        [FromBody] AppointmentRequestDTO requestDto, CancellationToken cancellationToken)
    {
        var response = await _commandDispatcher
            .Dispatch<AppointmentRequestDTO, AppointmentResponseDTO>(requestDto, cancellationToken);
        return Ok(response);
    }
    
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<PageResponse<AppointmentResponseDTO>>> GetAllAppointments(
        string? searchTerm, int page, int pageSize, CancellationToken cancellationToken)
    {
        var patients = await _queryDispatcher
            .Dispatch<GetAllAppointmentsQuery, PageResponse<AppointmentResponseDTO>>(
                new GetAllAppointmentsQuery(searchTerm, page, pageSize), cancellationToken);
        
        return Ok(patients);
    }
}