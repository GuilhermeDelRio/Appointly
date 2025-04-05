using Appointly.Application.Abstractions;
using Microsoft.Extensions.DependencyInjection;

namespace Appointly.Application.Dispatchers;

public class CommandDispatcher(IServiceProvider _serviceProvider) : ICommandDispatcher
{
    public Task<TCommandResult> Dispatch<TCommand, TCommandResult>(TCommand command, CancellationToken cancellation)
    {
        var handler = _serviceProvider.GetRequiredService<ICommandHandler<TCommand, TCommandResult>>();
        return handler.Handle(command, cancellation);
    }
}