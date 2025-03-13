using Appointly.Domain.Entities;
using Appointly.Persistence.Configurations;
using Microsoft.EntityFrameworkCore;

namespace Appointly.Persistence.Context;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfiguration(new PatientConfig());
        modelBuilder.ApplyConfiguration(new SystemInfoConfig());
    }
    
    public DbSet<Patient> Patients { get; set; }
    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<SystemInfo> SystemInfo { get; set; }
}