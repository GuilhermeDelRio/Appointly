using Appointly.Application.Dtos.PatientDTOs;
using Appointly.Domain.Entities;
using Appointly.Domain.Interfaces.Repository;
using MediatR;
using MongoDB.Driver.Linq;

namespace Appointly.Application.Features.PatientFeatures.Queries.GetPatients;

public sealed class GetPatientsQueryHandler : IRequestHandler<GetPatientsQuery, List<PatientResponseDTO>>
{
    private readonly IPatientRepository _patientRepository;

    public GetPatientsQueryHandler(IPatientRepository patientRepository)
    {
        _patientRepository = patientRepository;
    }

    public async Task<List<PatientResponseDTO>> Handle(GetPatientsQuery request, CancellationToken cancellationToken)
    {
        IQueryable<Patient> patientsQuery = _patientRepository.GetAll(cancellationToken);

        if (!string.IsNullOrWhiteSpace(request.searchTerm))
        {
            patientsQuery = patientsQuery.Where(p => 
                p.FirstName.Contains(request.searchTerm, StringComparison.CurrentCultureIgnoreCase) || 
                p.LastName.Contains(request.searchTerm, StringComparison.CurrentCultureIgnoreCase));
        }

        return await patientsQuery
            .Skip((request.page - 1) * request.pageSize)
            .Take(request.pageSize)
            .Select((p) => new PatientResponseDTO
            {
                Id = p.Id,
                FirstName = p.FirstName,
                LastName = p.LastName,
                DateOfBirth = p.DateOfBirth,
                PhoneNumber = p.PhoneNumber,
                Email = p.Email,
                Fee = p.Fee,
                IsSpecialPatient = p.IsSpecialPatient,
                HasAResponsible = p.HasAResponsible,
                ResponsibleName = p.ResponsibleName,
                ResponsiblePhoneNumber = p.ResponsiblePhoneNumber,
                RelationshipDegree = p.RelationshipDegree.ToString()
            })
            .ToListAsync(cancellationToken);
    }
}