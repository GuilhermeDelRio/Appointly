#nullable disable
using Appointly.Application.Dtos.PatientDTOs;
using MediatR;

namespace Appointly.Application.Features.PatientFeatures.Commands.UpdatePatient;

public class UpdatePatientCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
    public PatientRequestDTO Request { get; set; }
}