using Appointly.Infrastructure.Messaging.Interfaces;
using RabbitMQ.Client;

namespace Appointly.Infrastructure.Messaging.Configuration;

public class RabbitMqChannelFactory(IConnection connection) : IRabbitMqChannelFactory, IDisposable
{
    public async Task<IChannel> CreateChannel()
    {
        try
        {
            var channel = await connection.CreateChannelAsync();
            await channel.BasicQosAsync(0, 1, false);
            return channel;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            throw;
        }
    }

    public void Dispose()
    {
        GC.SuppressFinalize(this);
    }
}