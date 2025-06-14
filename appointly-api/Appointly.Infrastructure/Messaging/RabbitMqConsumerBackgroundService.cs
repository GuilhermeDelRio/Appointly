using Appointly.Infrastructure.Messaging.Interfaces;
using Microsoft.Extensions.Hosting;

namespace Appointly.Infrastructure.Messaging;

public class RabbitMqConsumerBackgroundService(IEnumerable<IMessageConsumer> consumers) : BackgroundService
{
    protected override Task ExecuteAsync(CancellationToken stoppingToken)
    {
        foreach (var consumer in consumers)
        {
            consumer.StartConsuming();
        }
        
        return Task.CompletedTask;
    }
}