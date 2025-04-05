using Appointly.Application.Abstractions;
using Microsoft.Extensions.DependencyInjection;

namespace Appointly.Application.Dispatchers;

public class QueryDispatcher(IServiceProvider _serviceProvider) : IQueryDispatcher
{
    public Task<TQueryResult> Dispatch<TQuery, TQueryResult>(TQuery query, CancellationToken cancellation)
    {
        var handler = _serviceProvider.GetRequiredService<IQueryHandler<TQuery, TQueryResult>>();
        return handler.Handle(query, cancellation);
    }
}