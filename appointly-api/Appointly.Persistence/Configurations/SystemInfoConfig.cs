using Appointly.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Appointly.Persistence.Configurations;

public class SystemInfoConfig : IEntityTypeConfiguration<SystemInfo>
{
    public void Configure(EntityTypeBuilder<SystemInfo> builder)
    {
        builder.ToTable("TB_SystemInfo");
        builder.HasKey(x => x.Id);
        
        builder.Property(x => x.AppointmentDuration)
            .HasColumnType("integer")
            .IsRequired();
    }
}