using Appointly.Application.Dtos.PatientDTOs;
using Appointly.Domain.Entities;
using Appointly.Domain.Enums;
using Appointly.Domain.Exceptions;
using Appointly.Domain.Interfaces.Repository;
using Appointly.Domain.Interfaces.Services;
using FluentValidation;
using MediatR;

namespace Appointly.Application.Features.PatientFeatures.Commands.UpdatePatient;

public class UpdatePatientHandler : IRequestHandler<UpdatePatientCommand, Unit>
{
    private readonly IPatientRepository _patientRepository;
    private readonly IPatientValidationService _patientValidationService;
    private readonly IValidator<PatientRequestDTO> _validator;

    public UpdatePatientHandler(
        IPatientRepository patientRepository,
        IPatientValidationService patientValidationService, 
        IValidator<PatientRequestDTO> validator)
    {
        _patientRepository = patientRepository;
        _patientValidationService = patientValidationService;
        _validator = validator;
    }

    public async Task<Unit> Handle(UpdatePatientCommand request, CancellationToken cancellationToken)
    {
        var hasPatient = await _patientRepository.GetById(request.Id, cancellationToken);
        
        if (hasPatient is null) throw new NotFoundException("Patient not found");

        var validationResult = await _validator.ValidateAsync(request.Request, cancellationToken);
        
        if (!validationResult.IsValid) 
            throw new ValidationException(validationResult.Errors);

        var patient = new Patient
        {
            Id = request.Id,
            FirstName = request.Request.FirstName,
            LastName = request.Request.LastName,
            DateOfBirth = request.Request.DateOfBirth,
            PhoneNumber = request.Request.PhoneNumber,
            Email = request.Request.Email,
            Fee = request.Request.Fee,
            IsSpecialPatient = request.Request.IsSpecialPatient,
            HasAResponsible = request.Request.HasAResponsible,
            ResponsibleName = request.Request.ResponsibleName,
            ResponsibleEmail = request.Request.ResponsibleEmail,
            ResponsiblePhoneNumber = request.Request.ResponsiblePhoneNumber,
            RelationshipDegree = Enum.TryParse(request.Request.RelationshipDegree?.Trim(), 
                true, out RelationshipDegree degree) ? degree : null
        };
        
        await _patientValidationService.ValidatePatientData(patient);
        await _patientRepository.Update(patient);
        
        return Unit.Value;
    }
}