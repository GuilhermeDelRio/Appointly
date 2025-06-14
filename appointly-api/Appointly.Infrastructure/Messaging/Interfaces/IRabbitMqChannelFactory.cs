using RabbitMQ.Client;

namespace Appointly.Infrastructure.Messaging.Interfaces;

public interface IRabbitMqChannelFactory
{
    Task<IChannel> CreateChannel();
}