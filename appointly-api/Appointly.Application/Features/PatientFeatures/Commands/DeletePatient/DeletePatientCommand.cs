namespace Appointly.Application.Features.PatientFeatures.Commands.DeletePatient;

public sealed record DeletePatientCommand
{
    public Guid Id { get; set; }
}