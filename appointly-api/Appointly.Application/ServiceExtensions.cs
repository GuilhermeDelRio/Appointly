using System.Reflection;
using Appointly.Application.Behaviors;
using Appointly.Application.Interfaces.Services;
using Appointly.Application.Services;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Appointly.Application;

public static class ServiceExtensions
{
    public static void ConfigureApplication(this IServiceCollection services)
    {
        var assembly = Assembly.GetExecutingAssembly();
        
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(assembly));
        services.AddValidatorsFromAssembly(assembly);
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
        services.AddScoped(typeof(IPipelineBehavior<,>), typeof(LoggingPipelineBehavior<,>));
        
        // validators
        services.AddScoped<IPatientValidationService ,PatientValidationService>();
        services.AddScoped<IAppointmentValidationService , AppointmentValidationService>();
    }
}