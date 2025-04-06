using Appointly.Application.Abstractions;
using Appointly.Application.Common;
using Appointly.Application.Dtos.Common;
using Appointly.Application.Dtos.PatientDTOs;
using Appointly.Application.Features.PatientFeatures.Commands.BulkDeletePatients;
using Appointly.Application.Features.PatientFeatures.Commands.DeletePatient;
using Appointly.Application.Features.PatientFeatures.Commands.UpdatePatient;
using Appointly.Application.Features.PatientFeatures.Queries.GetPatients;
using Appointly.Application.Features.PatientFeatures.Queries.GetPatientsById;
using Microsoft.AspNetCore.Mvc;

namespace Appointly.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PatientController : ControllerBase
{
    private readonly IQueryDispatcher _queryDispatcher;
    private readonly ICommandDispatcher _commandDispatcher;

    public PatientController(IQueryDispatcher queryDispatcher, ICommandDispatcher commandDispatcher)
    {
        _queryDispatcher = queryDispatcher;
        _commandDispatcher = commandDispatcher;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<PatientResponseDTO>> CreatePatient(
        [FromBody] PatientRequestDTO requestDto, CancellationToken cancellationToken)
    {
        var response = await _commandDispatcher
            .Dispatch<PatientRequestDTO, PatientResponseDTO>(requestDto, cancellationToken);
        return Ok(response);
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<PageResponse<PatientResponseDTO>>> GetAllPatients(
        string? searchTerm, int page, int pageSize, CancellationToken cancellationToken)
    {
        var patients = await _queryDispatcher
            .Dispatch<GetPatientsQuery, PageResponse<PatientResponseDTO>>(
                new GetPatientsQuery(searchTerm, page, pageSize), cancellationToken);
        
        return Ok(patients);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<PatientResponseDTO>> GetPatientById(Guid Id, CancellationToken cancellationToken)
    {
        var query = new GetPatientByIdQuery { Id = Id };
        return Ok(await _queryDispatcher.Dispatch<GetPatientByIdQuery, PatientResponseDTO>(query, cancellationToken));
    }

    [HttpPut]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> UpdatePatient(
        [FromBody] UpdatePatientCommand patientUpdateCommand, 
        CancellationToken cancellationToken)
    {
        var patient = await _commandDispatcher
            .Dispatch<UpdatePatientCommand, Unit>(patientUpdateCommand, cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> DeletePatient(Guid Id, CancellationToken cancellationToken)
    {
        var deleteCommand = new DeletePatientCommand { Id = Id };
        await _commandDispatcher.Dispatch<DeletePatientCommand, Unit>(deleteCommand, cancellationToken);
        return NoContent();
    }
    
    [HttpPost("bulkDelete")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesDefaultResponseType]
    public async Task<ActionResult> BulkDeleteExpenses(
        [FromBody] BulkDeletePatientsCommand bulkDeleteExpensesCommand,
        CancellationToken cancellationToken)
    {
        // await _mediator.Send(bulkDeleteExpensesCommand, cancellationToken);
        await _commandDispatcher
            .Dispatch<BulkDeletePatientsCommand, Unit>(bulkDeleteExpensesCommand, cancellationToken);
        return NoContent();
    }
}