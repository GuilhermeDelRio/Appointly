namespace Appointly.Infrastructure.Messaging.Interfaces;

public interface IMessagePublisher
{
    Task PublishAsync<T>(T message, string queueName) where T : class;
    Task PublishAsync<T>(T message, string exchangeName, string routingKey) where T : class;
}