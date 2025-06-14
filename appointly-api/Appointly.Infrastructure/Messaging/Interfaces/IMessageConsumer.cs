namespace Appointly.Infrastructure.Messaging.Interfaces;

public interface IMessageConsumer
{
    Task StartConsuming();
}