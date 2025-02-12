using Appointly.Domain.Entities;
using Appointly.Domain.Interfaces;
using AutoMapper;
using FluentValidation;
using MediatR;

namespace Appointly.Application.Features.PatientFeatures.Commands.CreatePatient;

public class CreatePatientHandler : IRequestHandler<CreatePatientRequest, CreatePatientResponse>{
    
    private readonly IPatientRepository _patientRepository;
    private readonly IMapper _mapper;

    public CreatePatientHandler(IPatientRepository patientRepository, IMapper mapper)
    {
        _patientRepository = patientRepository;
        _mapper = mapper;
    }

    public async Task<CreatePatientResponse> Handle(CreatePatientRequest request, CancellationToken cancellationToken)
    {
        var validator = new CreatePatientValidator();
        var validationResult = await validator.ValidateAsync(request, cancellationToken);
        
        if (!validationResult.IsValid)
            throw new ValidationException(validationResult.Errors);
        
        var patient = _mapper.Map<Patient>(request);
        await _patientRepository.Create(patient);
        return _mapper.Map<CreatePatientResponse>(patient);
    }
}