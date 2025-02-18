using Appointly.Application.Dtos.PatientDTOs;
using Appointly.Domain.Exceptions;
using Appointly.Domain.Interfaces.Repository;
using MediatR;

namespace Appointly.Application.Features.PatientFeatures.Queries.GetPatientsById;

public class GetPatientByIdHandler : IRequestHandler<GetPatientByIdQuery, PatientResponseDTO>
{
    private readonly IPatientRepository _patientRepository;

    public GetPatientByIdHandler(IPatientRepository patientRepository)
    {
        _patientRepository = patientRepository;
    }

    public async Task<PatientResponseDTO> Handle(GetPatientByIdQuery request, CancellationToken cancellationToken)
    {
        var patient = await _patientRepository.GetById(request.Id, cancellationToken);

        if (patient is null) throw new NotFoundException("Patient not found");
        
        return PatientResponseDTO.ToDTO(patient);
    }
}