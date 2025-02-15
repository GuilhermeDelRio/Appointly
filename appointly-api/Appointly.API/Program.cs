using Appointly.API.Middlewares;
using Appointly.Application;
using Appointly.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.AddCors(options => options.AddDefaultPolicy(b =>
{
    b.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
}));

builder.Services.ConfigurePersistence(builder.Configuration);
builder.Services.ConfigureApplication();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseMiddleware<ValidationExceptionMiddleware>();

app.UseCors();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();