using System.Text;
using System.Text.Json;
using Appointly.Infrastructure.Messaging.Interfaces;
using RabbitMQ.Client;

namespace Appointly.Infrastructure.Messaging.Publishers;

public class RabbitMqPublisher(IRabbitMqChannelFactory channelFactory) : IMessagePublisher
{
    private IChannel? _channel;

    public async Task PublishAsync<T>(T message, string queueName) where T : class
    {
        try
        {
            await EnsureConnection();
            
            await _channel!.QueueDeclareAsync(
                queue: queueName,
                durable: true,
                exclusive: false,
                autoDelete: false);
            
            await PublishMessageAsync(message, string.Empty, queueName);
        }
        catch (Exception ex)
        {
            RecreateChannel();
            throw new InvalidOperationException("Falha ao publicar mensagem", ex);
        }
    }

    public async Task PublishAsync<T>(T message, string exchangeName, string routingKey) where T : class
    {
        try
        {
            await EnsureConnection();
            await PublishMessageAsync(message, exchangeName, routingKey);
        }
        catch (Exception ex)
        {
            RecreateChannel();
            throw new InvalidOperationException("Falha ao publicar mensagem", ex);
        }
    }

    private async Task PublishMessageAsync<T>(T message, string exchange, string routingKey)
    {
        var json = JsonSerializer.Serialize(message);
        var body = Encoding.UTF8.GetBytes(json);
        
        await _channel!.BasicPublishAsync(
            exchange: exchange,
            routingKey: routingKey,
            body: body);
    }
    
    private async Task EnsureConnection()
    {
        if (_channel?.IsOpen != true)
        {
            _channel = await channelFactory.CreateChannel();
        }
    }
    
    private void RecreateChannel()
    {
        _channel = null;
    }
}