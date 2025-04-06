namespace Appointly.Application.Features.PatientFeatures.Queries.GetPatients;

public record GetPatientsQuery(string? searchTerm, int page, int pageSize);
