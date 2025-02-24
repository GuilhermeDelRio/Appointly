using Appointly.Application.Dtos.AppointmentDTOs;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Appointly.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AppointmentController : ControllerBase
{
    
    private readonly IMediator _mediator;

    public AppointmentController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<AppointmentResponseDTO>> CreatePatient(
        [FromBody] AppointmentRequestDTO requestDto, CancellationToken cancellationToken)
    {
        var response = await _mediator.Send(requestDto, cancellationToken);
        return NoContent();
    }
}