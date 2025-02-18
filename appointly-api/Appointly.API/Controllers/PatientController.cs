using Appointly.Application.Dtos.PatientDTOs;
using Appointly.Application.Features.PatientFeatures.Commands.DeletePatient;
using Appointly.Application.Features.PatientFeatures.Commands.UpdatePatient;
using Appointly.Application.Features.PatientFeatures.Queries.GetPatients;
using Appointly.Application.Features.PatientFeatures.Queries.GetPatientsById;
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

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<PatientResponseDTO>> GetPatient(string Id, CancellationToken cancellationToken)
    {
        var patientCommand = new GetPatientByIdQuery { Id = Id };
        return Ok(await _mediator.Send(patientCommand, cancellationToken));
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> UpdatePatient(
        [FromBody] PatientRequestDTO request, 
        string Id, CancellationToken cancellationToken)
    {
        var patientUpdateCommand = new UpdatePatientCommand { Id = Id, Request = request };
        await _mediator.Send(patientUpdateCommand, cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> DeletePatient(string Id, CancellationToken cancellationToken)
    {
        var deleteCommand = new DeletePatientCommand { Id = Id };
        await _mediator.Send(deleteCommand, cancellationToken);
        return NoContent();
    }
}