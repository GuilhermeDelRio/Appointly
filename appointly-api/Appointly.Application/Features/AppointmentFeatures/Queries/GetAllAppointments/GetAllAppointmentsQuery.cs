namespace Appointly.Application.Features.AppointmentFeatures.Queries.GetAllAppointments;

public record GetAllAppointmentsQuery(string? searchTerm, int page, int pageSize);