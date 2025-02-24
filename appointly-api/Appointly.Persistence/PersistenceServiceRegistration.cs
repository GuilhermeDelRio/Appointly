#nullable disable
using Appointly.Domain.Interfaces.Repository;
using Appointly.Persistence.Repository;
using Appointly.Persistence.Settings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;

namespace Appointly.Persistence;

public static class PersistenceServiceRegistration
{
    public static void ConfigurePersistence(this IServiceCollection services, IConfiguration configuration)
    {
        var section = configuration.GetSection("MongoDB");

        var mongoConfig = section.Get<MongoSettings>();
        MongoClient mongoClient = new MongoClient(mongoConfig.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(mongoConfig.DatabaseName);
        
        services.AddSingleton(mongoDatabase);
        services.AddScoped<IPatientRepository, PatientRepository>();
        services.AddScoped<IAppointmentRepository, AppointmentRepository>();
        services.AddScoped<ISystemInfoRepository, SystemInfoRepository>();
    }
}   