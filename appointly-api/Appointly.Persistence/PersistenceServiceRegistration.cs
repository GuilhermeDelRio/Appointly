#nullable disable
using Appointly.Domain.Interfaces.Repository;
using Appointly.Persistence.Context;
using Appointly.Persistence.Repository;
using Appointly.Persistence.Repository.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Appointly.Persistence;

public static class PersistenceServiceRegistration
{
    public static IServiceCollection ConfigurePersistence(
        this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<AppDbContext>(opt => 
            opt.UseNpgsql(configuration.GetConnectionString("AppointlyConnectionString")));

        services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        
        services.AddScoped<IPatientRepository, PatientRepository>();
        services.AddScoped<IAppointmentRepository, AppointmentRepository>();
        services.AddScoped<ISystemInfoRepository, SystemInfoRepository>();
        
        return services;
    }
}   