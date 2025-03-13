using Appointly.Domain.Exceptions;
using Appointly.Domain.Interfaces.Repository;
using MediatR;

namespace Appointly.Application.Features.PatientFeatures.Commands.DeletePatient;

public class DeletePatientHandler : IRequestHandler<DeletePatientCommand, Unit>
{
    private readonly IPatientRepository _patientRepository;
    private readonly IUnitOfWork _unitOfWork;

    public DeletePatientHandler(IPatientRepository patientRepository, IUnitOfWork unitOfWork)
    {
        _patientRepository = patientRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<Unit> Handle(DeletePatientCommand request, CancellationToken cancellationToken)
    {
        var hasPatient = await _patientRepository.GetById(request.Id, cancellationToken);
        
        if (hasPatient is null) throw new NotFoundException("Patient not found");
        
        _patientRepository.Delete(hasPatient);
        await _unitOfWork.Commit(cancellationToken);
        
        return Unit.Value;
    }
}