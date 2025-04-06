using Appointly.Application.Abstractions;
using Appointly.Application.Common;
using Appointly.Domain.Interfaces.Repository;

namespace Appointly.Application.Features.PatientFeatures.Commands.BulkDeletePatients;

public class BulkDeletePatientsHandler : ICommandHandler<BulkDeletePatientsCommand, Unit>
{
    private readonly IPatientRepository _patientRepository;
    private readonly IUnitOfWork _unitOfWork;

    public BulkDeletePatientsHandler(IPatientRepository patientRepository, IUnitOfWork unitOfWork)
    {
        _patientRepository = patientRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<Unit> Handle(BulkDeletePatientsCommand request, CancellationToken cancellationToken)
    {
        await _patientRepository.BulkDelete(request.Ids, cancellationToken);
        await _unitOfWork.Commit(cancellationToken);
        
        return Unit.Value;
    }
}