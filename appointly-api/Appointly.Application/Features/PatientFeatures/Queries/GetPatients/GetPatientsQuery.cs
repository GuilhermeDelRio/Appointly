using Appointly.Application.Dtos.PatientDTOs;
using MediatR;

namespace Appointly.Application.Features.PatientFeatures.Queries.GetPatients;

public record GetPatientsQuery(string? searchTerm) : IRequest<List<PatientResponseDTO>>;
