using Appointly.Infrastructure.Messaging;
using Appointly.Infrastructure.Messaging.Configuration;
using Appointly.Infrastructure.Messaging.Consumers;
using Appointly.Infrastructure.Messaging.Interfaces;
using Appointly.Infrastructure.Messaging.Publishers;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;

namespace Appointly.Infrastructure;

public static class InfrastructureServiceRegistration
{
    public static IServiceCollection AddInfrastructureServices(
        this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<RabbitMqSettings>(configuration.GetSection("RabbitMQ"));
        
        // Connecting to RabbitMQ
        services.AddSingleton<IConnectionFactory>(provider =>
        {
            var settings = provider.GetService<IOptions<RabbitMqSettings>>()?.Value;
            return new ConnectionFactory
            {
                HostName = settings!.HostName,
                Port = settings.Port,
                UserName = settings.UserName,
                Password = settings.Password,
                VirtualHost = settings.VirtualHost ?? "/",
                AutomaticRecoveryEnabled = true,
                NetworkRecoveryInterval = TimeSpan.FromSeconds(10),
                RequestedHeartbeat = TimeSpan.FromSeconds(60)
            };
        });
        
        // Connection como Singleton
        services.AddSingleton<IConnection>(provider =>
        {
            var factory = provider.GetRequiredService<IConnectionFactory>();
            return factory.CreateConnectionAsync("AppointlyConnection").GetAwaiter().GetResult();
        });
        
        // Channel Factory
        services.AddSingleton<IRabbitMqChannelFactory, RabbitMqChannelFactory>();
        
        // Publisher
        services.AddSingleton<IMessagePublisher, RabbitMqPublisher>();
        
        // Consumers
        services.AddSingleton<IMessageConsumer, AppointmentCreateConsumer>();
        
        // Background service configuration
        services.AddHostedService<RabbitMqConsumerBackgroundService>();
        
        // Services
        // services.AddScoped<IEmailSender, EmailSender>();
        return services;
    }
}