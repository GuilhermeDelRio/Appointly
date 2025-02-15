using FluentValidation;

namespace Appointly.API.Middlewares;

public class ValidationExceptionMiddleware
{
    private readonly RequestDelegate _next;

    public ValidationExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (ValidationException ex)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            
            var errors = ex.Errors.GroupBy(e => e.PropertyName)
                .ToDictionary(g => g.Key, g => 
                    g.Select(e => e.ErrorMessage).ToArray());
            
            var response = new
            {
                title = "Validation Failed",
                status = 400,
                errors = errors
            };
            
            await context.Response.WriteAsJsonAsync(response);
        }
        catch (Exception ex)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;

            var response = new
            {
                title = "Internal Server Error",
                status = 500,
                message = ex.Message
            };

            await context.Response.WriteAsJsonAsync(response);
        }
    }
}