using Appointly.Application.Abstractions;
using Appointly.Application.Dtos.PatientDTOs;
using Appointly.Application.Mappers;
using Appointly.Domain.Exceptions;
using Appointly.Domain.Interfaces.Repository;

namespace Appointly.Application.Features.PatientFeatures.Queries.GetPatientsById;

public class GetPatientByIdHandler : IQueryHandler<GetPatientByIdQuery, PatientResponseDTO>
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
        
        return patient.ToDto();
    }
}