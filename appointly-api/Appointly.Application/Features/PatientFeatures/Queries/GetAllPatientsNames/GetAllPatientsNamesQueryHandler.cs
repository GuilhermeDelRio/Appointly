using Appointly.Application.Abstractions;
using Appointly.Application.Dtos.PatientDTOs;
using Appointly.Domain.Entities;
using Appointly.Domain.Interfaces.Repository;
using Microsoft.EntityFrameworkCore;

namespace Appointly.Application.Features.PatientFeatures.Queries.GetAllPatientsNames;

public class GetAllPatientsNamesQueryHandler : IQueryHandler<GetAllPatientsNamesQuery, List<PatientsNamesResponseDTO>>
{
    private readonly IPatientRepository _patientRepository;
    
    public GetAllPatientsNamesQueryHandler(IPatientRepository patientRepository)
    {
        _patientRepository = patientRepository;
    }
    
    public async Task<List<PatientsNamesResponseDTO>> Handle(GetAllPatientsNamesQuery query, CancellationToken cancellation)
    {
        IQueryable<Patient> allPatients = _patientRepository.GetAll(cancellation);

        return await allPatients
            .Select(p => new PatientsNamesResponseDTO(p.Id, $"{p.FirstName} {p.LastName}"))
            .ToListAsync(cancellation);
    }
}