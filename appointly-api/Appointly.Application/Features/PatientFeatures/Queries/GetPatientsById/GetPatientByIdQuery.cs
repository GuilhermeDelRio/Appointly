#nullable disable
using Appointly.Application.Dtos.PatientDTOs;
using MediatR;

namespace Appointly.Application.Features.PatientFeatures.Queries.GetPatientsById;

public class GetPatientByIdQuery : IRequest<PatientResponseDTO>
{
    public string Id { get; set; }
}