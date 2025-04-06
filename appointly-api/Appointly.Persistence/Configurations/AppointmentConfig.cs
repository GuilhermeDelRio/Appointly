using Appointly.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Appointly.Persistence.Configurations;

public class AppointmentConfig :  IEntityTypeConfiguration<Appointment>
{
    public void Configure(EntityTypeBuilder<Appointment> builder)
    {
        builder.ToTable("TB_Appointments");
        
        builder.HasKey(e => e.Id);
        
        builder.Property(a => a.InitialDate)
            .IsRequired();
        builder.Property(a => a.EndDate)
            .IsRequired();

        builder.Property(a => a.AppointmentStatus)
            .HasColumnName("AppointmentStatus")
            .HasColumnType("VARCHAR(30)")
            .HasConversion<string>()
            .IsRequired();
        
        builder.Property(a => a.AppointmentLocation)
            .HasColumnName("AppointmentLocation")
            .HasColumnType("VARCHAR(30)")
            .HasConversion<string>()
            .IsRequired();
        
        builder.HasOne(a => a.Patient)
            .WithMany(p => p.Appointments)
            .HasForeignKey(a => a.PatientId)
            .IsRequired();
    }
}