// using MediatR;
// using Microsoft.Extensions.Logging;
//
// namespace Appointly.Application.Behaviors;
//
// public class LoggingPipelineBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
// {
//     private readonly ILogger<LoggingPipelineBehavior<TRequest, TResponse>> _logger;
//
//     public LoggingPipelineBehavior(ILogger<LoggingPipelineBehavior<TRequest, TResponse>> logger)
//     {
//         _logger = logger;
//     }
//
//     public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
//     {
//         _logger.LogInformation(
//             "Handling request {@RequestName}, {@DateTimeUtc}", 
//             typeof(TRequest).Name, 
//             DateTime.UtcNow);
//         
//         var result = await next();
//         
//         _logger.LogInformation(
//             "Completed request {@RequestName}, {@DateTimeUtc}", 
//             typeof(TRequest).Name, 
//             DateTime.UtcNow);
//
//         return result;
//     }
// }