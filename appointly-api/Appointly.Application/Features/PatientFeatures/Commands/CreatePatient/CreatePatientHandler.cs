using Appointly.Application.Dtos.PatientDTOs;
using Appointly.Domain.Interfaces.Repository;
using Appointly.Domain.Interfaces.Services;
using FluentValidation;
using MediatR;

namespace Appointly.Application.Features.PatientFeatures.Commands.CreatePatient;

public class CreatePatientHandler : IRequestHandler<PatientRequestDTO, PatientResponseDTO>{
    
    private readonly IPatientRepository _patientRepository;
    private readonly IPatientValidationService _patientValidationService;
    private readonly IValidator<PatientRequestDTO> _validator;

    public CreatePatientHandler(
        IPatientRepository patientRepository, 
        IPatientValidationService patientValidationService, 
        IValidator<PatientRequestDTO> validator)
    {
        _patientRepository = patientRepository;
        _patientValidationService = patientValidationService;
        _validator = validator;
    }

    public async Task<PatientResponseDTO> Handle(PatientRequestDTO request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);
        
        if (!validationResult.IsValid)
            throw new ValidationException(validationResult.Errors);

        var patient = request.ToEntity();
        
        await _patientValidationService.ValidatePatientData(patient);
        
        await _patientRepository.Create(patient);
        return PatientResponseDTO.ToDTO(patient);
    }
}