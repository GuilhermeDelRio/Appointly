using Appointly.Application.Abstractions;
using Appointly.Application.Dtos.AppointmentDTOs;
using Appointly.Application.Interfaces.Services;
using Appointly.Application.Mappers;
using Appointly.Domain.Interfaces.Repository;
using Appointly.Infrastructure.Messaging.Interfaces;
using FluentValidation;

namespace Appointly.Application.Features.AppointmentFeatures.Commands.CreateAppointment;

public class CreateAppointmentHandler : ICommandHandler<AppointmentRequestDTO, AppointmentResponseDTO>
{
    private readonly IAppointmentRepository _appointmentRepository;
    private readonly IAppointmentValidationService _appointmentValidationService;
    private readonly IValidator<AppointmentRequestDTO> _validator;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMessagePublisher  _messagePublisher;

    public CreateAppointmentHandler(
        IAppointmentRepository appointmentRepository, 
        IAppointmentValidationService appointmentValidationService, 
        IValidator<AppointmentRequestDTO> validator, 
        IUnitOfWork unitOfWork,
        IMessagePublisher messagePublisher )
    {
        _appointmentRepository = appointmentRepository;
        _appointmentValidationService = appointmentValidationService;
        _validator = validator;
        _unitOfWork = unitOfWork;
        _messagePublisher = messagePublisher;
    }
    
    public async Task<AppointmentResponseDTO> Handle(AppointmentRequestDTO request, CancellationToken cancellationToken)
    {
        // var validationResult = await _validator.ValidateAsync(request, cancellationToken);
        //
        // if (!validationResult.IsValid) 
        //     throw new ValidationException(validationResult.Errors);
        //
        // await _appointmentValidationService
        //     .ValidateAppointment(request.InitialDate, request.EndDate, cancellationToken);
        //
        // var appointment = request.ToEntity();
        //
        // _appointmentRepository.Create(appointment);
        // await _unitOfWork.Commit(cancellationToken);
        //
        // return appointment.ToDto();
        
        var dto = new AppointmentResponseDTO
        {
            Id = Guid.NewGuid(),
        };
        
        await _messagePublisher.PublishAsync(dto, "appointment-created-queue");
        
        return new AppointmentResponseDTO();
    }
}