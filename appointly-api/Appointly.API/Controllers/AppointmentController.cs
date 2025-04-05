using Appointly.Application.Abstractions;
using Appointly.Application.Dtos.AppointmentDTOs;
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
        return NoContent();
    }
}