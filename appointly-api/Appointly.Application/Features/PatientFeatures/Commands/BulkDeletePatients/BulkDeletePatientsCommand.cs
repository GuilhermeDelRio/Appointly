using MediatR;

namespace Appointly.Application.Features.PatientFeatures.Commands.BulkDeletePatients;

public class BulkDeletePatientsCommand : IRequest<Unit>
{
    public List<Guid> Ids { get; set; }
}