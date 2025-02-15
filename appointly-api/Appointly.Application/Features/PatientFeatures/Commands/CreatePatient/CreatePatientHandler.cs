using Appointly.Domain.Entities;
using Appointly.Domain.Interfaces.Repository;
using Appointly.Domain.Interfaces.Services;
using AutoMapper;
using FluentValidation;
using MediatR;

namespace Appointly.Application.Features.PatientFeatures.Commands.CreatePatient;

public class CreatePatientHandler : IRequestHandler<CreatePatientRequest, CreatePatientResponse>{
    
    private readonly IPatientRepository _patientRepository;
    private readonly IPatientValidationService _patientValidationService;
    private readonly IValidator<CreatePatientRequest> _validator;
    private readonly IMapper _mapper;

    public CreatePatientHandler(
        IPatientRepository patientRepository, 
        IPatientValidationService patientValidationService, 
        IValidator<CreatePatientRequest> validator, IMapper mapper)
    {
        _patientRepository = patientRepository;
        _patientValidationService = patientValidationService;
        _validator = validator;
        _mapper = mapper;
    }

    public async Task<CreatePatientResponse> Handle(CreatePatientRequest request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);
        
        if (!validationResult.IsValid)
            throw new ValidationException(validationResult.Errors);
        
        var patient = _mapper.Map<Patient>(request);
        
        _patientValidationService.ValidatePatientData(patient);
        
        await _patientRepository.Create(patient);
        return _mapper.Map<CreatePatientResponse>(patient);
    }
}