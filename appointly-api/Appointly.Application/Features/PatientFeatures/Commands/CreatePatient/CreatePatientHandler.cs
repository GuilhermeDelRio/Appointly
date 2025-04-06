using Appointly.Application.Abstractions;
using Appointly.Application.Dtos.PatientDTOs;
using Appointly.Application.Interfaces.Services;
using Appointly.Application.Mappers;
using Appointly.Domain.Interfaces.Repository;
using FluentValidation;

namespace Appointly.Application.Features.PatientFeatures.Commands.CreatePatient;

public class CreatePatientHandler : ICommandHandler<PatientRequestDTO, PatientResponseDTO>
{
    private readonly IPatientRepository _patientRepository;
    private readonly IPatientValidationService _patientValidationService;
    private readonly IValidator<PatientRequestDTO> _validator;
    private readonly IUnitOfWork _unitOfWork;

    public CreatePatientHandler(
        IPatientRepository patientRepository, 
        IPatientValidationService patientValidationService, 
        IValidator<PatientRequestDTO> validator, 
        IUnitOfWork unitOfWork)
    {
        _patientRepository = patientRepository;
        _patientValidationService = patientValidationService;
        _validator = validator;
        _unitOfWork = unitOfWork;
    }

    public async Task<PatientResponseDTO> Handle(PatientRequestDTO request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);
        
        if (!validationResult.IsValid)
            throw new ValidationException(validationResult.Errors);

        var patient = request.ToEntity();
        
        await _patientValidationService.ValidatePatientData(patient);
        
        _patientRepository.Create(patient);
        await _unitOfWork.Commit(cancellationToken);
        
        return patient.ToDto();
    }
}