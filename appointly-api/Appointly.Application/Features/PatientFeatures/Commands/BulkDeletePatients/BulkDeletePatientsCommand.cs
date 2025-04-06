namespace Appointly.Application.Features.PatientFeatures.Commands.BulkDeletePatients;

public record BulkDeletePatientsCommand
{
    public List<Guid> Ids { get; set; }
}