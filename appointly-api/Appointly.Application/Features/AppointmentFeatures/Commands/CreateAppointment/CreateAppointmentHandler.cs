using Appointly.Application.Abstractions;
using Appointly.Application.Dtos.AppointmentDTOs;
using Appointly.Application.Interfaces.Services;
using Appointly.Domain.Entities;
using Appointly.Domain.Interfaces.Repository;
using FluentValidation;

namespace Appointly.Application.Features.AppointmentFeatures.Commands.CreateAppointment;

public class CreateAppointmentHandler : ICommandHandler<AppointmentRequestDTO, AppointmentResponseDTO>
{
    private readonly IAppointmentRepository _appointmentRepository;
    private readonly IAppointmentValidationService _appointmentValidationService;
    private readonly IValidator<AppointmentRequestDTO> _validator;
    private readonly IUnitOfWork _unitOfWork;

    public CreateAppointmentHandler(
        IAppointmentRepository appointmentRepository, 
        IAppointmentValidationService appointmentValidationService, 
        IValidator<AppointmentRequestDTO> validator, 
        IUnitOfWork unitOfWork)
    {
        _appointmentRepository = appointmentRepository;
        _appointmentValidationService = appointmentValidationService;
        _validator = validator;
        _unitOfWork = unitOfWork;
    }


    public async Task<AppointmentResponseDTO> Handle(AppointmentRequestDTO request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);
        
        if (!validationResult.IsValid) 
            throw new ValidationException(validationResult.Errors);

        await _appointmentValidationService
            .ValidateAppointment(request.InitialDate, request.EndDate, cancellationToken);
        
        Appointment appointment = request.ToEntity();
        
        _appointmentRepository.Create(appointment);
        await _unitOfWork.Commit(cancellationToken);
        
        return new AppointmentResponseDTO();
    }
}