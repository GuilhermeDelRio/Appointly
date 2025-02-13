using Appointly.Application.Resources;
using FluentValidation;

namespace Appointly.Application.Features.PatientFeatures.Commands.CreatePatient;

public class CreatePatientValidator : AbstractValidator<CreatePatientRequest>
{
    public CreatePatientValidator()
    {
        RuleFor(x => x.FirstName)
            .NotEmpty()
            .WithMessage(x => string.Format(ValidationMessages.RequiredField, nameof(x.FirstName)))
            .Length(2, 25)
            .WithMessage(x => string.Format(ValidationMessages.LengthBetween, nameof(x.FirstName), 2, 25));
        
        RuleFor(x => x.LastName)
            .NotEmpty()
            .WithMessage(x => string.Format(ValidationMessages.RequiredField, nameof(x.LastName)))
            .Length(2, 50)
            .WithMessage(x => string.Format(ValidationMessages.LengthBetween, nameof(x.LastName), 2, 50));

        RuleFor(x => x.DateOfBirth)
            .NotEmpty()
            .WithMessage(x => string.Format(ValidationMessages.RequiredField, nameof(x.DateOfBirth)))
            .LessThanOrEqualTo(DateTime.Now)
            .WithMessage(x => string.Format(ValidationMessages.FutureDate, nameof(x.DateOfBirth)));

        RuleFor(x => x.PhoneNumber)
            .NotEmpty()
            .WithMessage(x => string.Format(ValidationMessages.RequiredField, nameof(x.PhoneNumber)));

        RuleFor(x => x.Email)
            .NotEmpty()
            .WithMessage(x => string.Format(ValidationMessages.RequiredField, nameof(x.Email)))
            .EmailAddress()
            .WithMessage(x => string.Format(ValidationMessages.NotValidField, nameof(x.Email)));
        
        RuleFor(x => x.Fee)
            .NotEmpty()
            .WithMessage(x => string.Format(ValidationMessages.RequiredField, nameof(x.Fee)))
            .GreaterThanOrEqualTo(0)
            .WithMessage(x => string.Format(ValidationMessages.GraterThanZero, nameof(x.Fee)));

        RuleFor(x => x.IsSpecialPatient)
            .NotNull()
            .WithMessage(x => string.Format(ValidationMessages.RequiredField, nameof(x.IsSpecialPatient)));
        
        RuleFor(x => x.IsUnderage)
            .NotNull()
            .WithMessage(x => string.Format(ValidationMessages.RequiredField, nameof(x.IsUnderage)));
        
        // Secondary fields
        
        RuleFor(x => x.ResponsibleName)
            .Length(2, 25)
            .WithMessage(x => string.Format(ValidationMessages.LengthBetween, nameof(x.ResponsibleName), 2, 25));
        
        RuleFor(x => x.ResponsibleEmail)
            .EmailAddress()
            .WithMessage(x => string.Format(ValidationMessages.NotValidField, nameof(x.ResponsibleEmail)));
    }
}