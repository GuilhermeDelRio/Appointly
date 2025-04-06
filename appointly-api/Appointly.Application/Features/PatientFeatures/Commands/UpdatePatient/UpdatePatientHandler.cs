using Appointly.Application.Abstractions;
using Appointly.Application.Common;
using Appointly.Application.Interfaces.Services;
using Appointly.Application.Mappers;
using Appointly.Domain.Exceptions;
using Appointly.Domain.Interfaces.Repository;
using FluentValidation;

namespace Appointly.Application.Features.PatientFeatures.Commands.UpdatePatient;

public class UpdatePatientHandler : ICommandHandler<UpdatePatientCommand, Unit>
{
    private readonly IPatientRepository _patientRepository;
    private readonly IPatientValidationService _patientValidationService;
    private readonly IValidator<UpdatePatientCommand> _validator;
    private readonly IUnitOfWork _unitOfWork;

    public UpdatePatientHandler(
        IPatientRepository patientRepository,
        IPatientValidationService patientValidationService, 
        IValidator<UpdatePatientCommand> validator, IUnitOfWork unitOfWork)
    {
        _patientRepository = patientRepository;
        _patientValidationService = patientValidationService;
        _validator = validator;
        _unitOfWork = unitOfWork;
    }

    public async Task<Unit> Handle(UpdatePatientCommand request, CancellationToken cancellationToken)
    {
        var patient = await _patientRepository.GetById(request.Id, cancellationToken);
        
        if (patient is null) throw new NotFoundException("Patient not found");

        var validationResult = await _validator.ValidateAsync(request, cancellationToken);
        
        if (!validationResult.IsValid) 
            throw new ValidationException(validationResult.Errors);

        request.UpdateEntity(patient);
        
        await _patientValidationService.ValidatePatientData(patient);
        _patientRepository.Update(patient);
        await _unitOfWork.Commit(cancellationToken);

        return Unit.Value;
    }
}