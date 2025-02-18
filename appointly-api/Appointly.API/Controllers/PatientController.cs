using Appointly.Application.Dtos.PatientDTOs;
using Appointly.Application.Features.PatientFeatures.Queries.GetPatients;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Appointly.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PatientController : ControllerBase
{
    private readonly IMediator _mediator;

    public PatientController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<PatientResponseDTO>> CreatePatient(
        [FromBody] PatientRequestDTO requestDto, CancellationToken cancellationToken)
    {
        var response = await _mediator.Send(requestDto, cancellationToken);
        return Ok(response);
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<List<PatientResponseDTO>>> GetPatients(
        string? searchTerm, int page, int pageSize, CancellationToken cancellationToken)
    {
        var patients = await _mediator.Send(
            new GetPatientsQuery(searchTerm, page, pageSize), cancellationToken);
        
        return Ok(patients);
    }
}