using Appointly.Application.Abstractions;
using Appointly.Application.Dispatchers;
using Appointly.Application.Interfaces.Services;
using Appointly.Application.Services;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace Appointly.Application;

public static class ServiceExtensions
{
    public static void ConfigureApplication(this IServiceCollection services)
    {
        var applicationAssembly = typeof(ICommandDispatcher).Assembly;
        
        // fluent validation
        services.AddValidatorsFromAssembly(applicationAssembly);
        
        // mediator
        services.Scan(scan => scan
            .FromAssemblies(applicationAssembly)
            .AddClasses(classes => classes.AssignableTo(typeof(ICommandHandler<,>)))
            .AsImplementedInterfaces()
            .WithScopedLifetime());
        
        //services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
        //services.AddScoped(typeof(IPipelineBehavior<,>), typeof(LoggingPipelineBehavior<,>));
        
        
        // CQRS Dispatchers
        services.AddScoped<ICommandDispatcher, CommandDispatcher>();
        services.AddScoped<IQueryDispatcher, QueryDispatcher>();
        
        // validators (business rules)
        services.AddScoped<IPatientValidationService ,PatientValidationService>();
        services.AddScoped<IAppointmentValidationService , AppointmentValidationService>();
    }
}