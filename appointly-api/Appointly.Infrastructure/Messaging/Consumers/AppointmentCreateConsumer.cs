using System.Text;
using Appointly.Infrastructure.Messaging.Interfaces;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace Appointly.Infrastructure.Messaging.Consumers;

public class AppointmentCreateConsumer(IRabbitMqChannelFactory channelFactory) : IMessageConsumer
{
    private IChannel? _channel;

    public async Task StartConsuming()
    {
        try
        {
            _channel = await channelFactory.CreateChannel();

            await _channel?.QueueDeclareAsync(
                queue: "appointment-created-queue",
                durable: true,
                exclusive: false,
                autoDelete: false,
                arguments: null)!;

            var consumer = new AsyncEventingBasicConsumer(_channel);
            consumer.ReceivedAsync += async (model, ea) =>
            {
                try
                {
                    var body = ea.Body.ToArray();
                    var message = Encoding.UTF8.GetString(body);
                    
                    await Task.CompletedTask;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Erro ao processar a mensagem: {ex.Message}");
                }
            };

            await _channel.BasicConsumeAsync("appointment-created-queue", true, consumer);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erro ao iniciar o consumidor: {ex.Message}");
        }
    }
}
