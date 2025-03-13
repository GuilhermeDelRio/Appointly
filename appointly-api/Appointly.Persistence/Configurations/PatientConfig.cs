using Appointly.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Appointly.Persistence.Configurations;

public class PatientConfig : IEntityTypeConfiguration<Patient>
{
    public void Configure(EntityTypeBuilder<Patient> builder)
    {
        builder.ToTable("TB_Patients");
        
        builder.HasKey(p => p.Id);
        
        builder.Property(p => p.FirstName)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(p => p.LastName)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(p => p.DateOfBirth)
            .IsRequired();

        builder.Property(p => p.PhoneNumber)
            .IsRequired()
            .HasMaxLength(15);

        builder.Property(p => p.Email)
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(p => p.Fee)
            .IsRequired()
            .HasColumnType("decimal(18,2)");

        builder.Property(p => p.IsSpecialPatient)
            .IsRequired();

        builder.Property(p => p.HasAResponsible)
            .IsRequired();
        
        builder.Property(p => p.ResponsibleName)
            .HasMaxLength(100);

        builder.Property(p => p.ResponsibleEmail)
            .HasMaxLength(255);

        builder.Property(p => p.ResponsiblePhoneNumber)
            .HasMaxLength(15);

        builder.Property(p => p.RelationshipDegree)
            .HasColumnType("RelationshipDegree")
            .HasConversion<string>();
    }
}