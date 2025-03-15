#nullable disable
using MediatR;

namespace Appointly.Application.Features.PatientFeatures.Commands.DeletePatient;

public sealed record DeletePatientCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
}