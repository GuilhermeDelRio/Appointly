#nullable disable
using MediatR;

namespace Appointly.Application.Features.PatientFeatures.Commands.DeletePatient;

public sealed record DeletePatientCommand : IRequest<Unit>
{
    public string Id { get; set; }
}