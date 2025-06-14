using Appointly.Application.Dtos.AppointmentDTOs;
using Appointly.Application.Resources;
using Appointly.Domain.Enums;
using FluentValidation;

namespace Appointly.Application.Features.AppointmentFeatures.Commands.CreateAppointment;

public class CreateAppointmentValidator : AbstractValidator<AppointmentRequestDTO>
{
    public CreateAppointmentValidator()
    {
        RuleFor(a => a.InitialDate)
            .NotEmpty()
            .WithMessage(x => string.Format(ValidationMessages.RequiredField, nameof(x.InitialDate)))
            .GreaterThan(DateTime.Now)
            .WithMessage(x => string.Format(ValidationMessages.PastDate, nameof(x.InitialDate)));

        RuleFor(a => a.EndDate)
            .NotEmpty()
            .WithMessage(x => string.Format(ValidationMessages.RequiredField, nameof(x.EndDate)))
            .GreaterThan(a => a.InitialDate)
            .WithMessage(x => string.Format(ValidationMessages.PastDate, nameof(x.EndDate)));

        RuleFor(a => a.PatientId)
            .NotEmpty()
            .WithMessage(x => string.Format(ValidationMessages.RequiredField, nameof(x.PatientId)));
        
        RuleFor(x => x.AppointmentStatus)
            .IsEnumName(typeof(AppointmentStatus), false);
        
        RuleFor(x => x.AppointmentLocation)
            .IsEnumName(typeof(AppointmentLocation), false);
    }
}