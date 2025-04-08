using Appointly.Application.Abstractions;
using Appointly.Application.Dtos.AppointmentDTOs;
using Appointly.Application.Interfaces.Services;
using Appointly.Application.Mappers;
using Appointly.Domain.Exceptions;
using Appointly.Domain.Interfaces.Repository;
using FluentValidation;

namespace Appointly.Application.Features.AppointmentFeatures.Commands.UpdateAppointmentByDate;

public class UpdateAppointmentByDateHandler(
    IAppointmentRepository _appointmentRepository,
    IPatientRepository _patientRepository,
    IUnitOfWork _unitOfWork,
    IAppointmentValidationService _appointmentValidationService,
    IValidator<UpdateAppointmentByDateCommand> _validator) : ICommandHandler<UpdateAppointmentByDateCommand, AppointmentResponseDTO>
{
    public async Task<AppointmentResponseDTO> Handle(UpdateAppointmentByDateCommand command, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(command, cancellationToken);
        
        if (!validationResult.IsValid) 
            throw new ValidationException(validationResult.Errors);
        
        var appointment = await _appointmentRepository.GetById(command.Id, cancellationToken);
        
        if (appointment is null) throw new NotFoundException("Appointment not found");
        
        var patient = await _patientRepository.GetById(command.PatientId, cancellationToken);
        
        if (patient is null) throw new NotFoundException("Patient not found");
        
        await _appointmentValidationService.
            ValidateAppointment(command.InitialDate, command.EndDate, cancellationToken);
        
        appointment.InitialDate = command.InitialDate;
        appointment.EndDate = command.EndDate;
        
        _appointmentRepository.Update(appointment);
        await _unitOfWork.Commit(cancellationToken);
        
        return appointment.ToDto();
    }
}