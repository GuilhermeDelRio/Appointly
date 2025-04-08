using Appointly.Application.Resources;
using FluentValidation;

namespace Appointly.Application.Features.AppointmentFeatures.Commands.UpdateAppointmentByDate;

public class UpdateAppointmentByDateValidator : AbstractValidator<UpdateAppointmentByDateCommand>
{
    public UpdateAppointmentByDateValidator()
    {
        RuleFor(a => a.Id)
            .NotEmpty()
            .WithMessage(x => string.Format(ValidationMessages.RequiredField, nameof(x.Id)));
        
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
    }
}