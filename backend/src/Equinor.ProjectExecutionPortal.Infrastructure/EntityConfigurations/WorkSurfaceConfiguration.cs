﻿using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations;

public class WorkSurfaceConfiguration : IEntityTypeConfiguration<WorkSurface>
{
    public void Configure(EntityTypeBuilder<WorkSurface> builder)
    {
        builder.ConfigureCreationAudit();
        builder.ConfigureModificationAudit();

        builder.Property(t => t.Name)
            .HasMaxLength(WorkSurface.NameLengthMax)
            .IsRequired();

        builder.Property(t => t.ShortName)
            .HasMaxLength(WorkSurface.ShortNameLengthMax)
            .IsRequired();
        
        builder.Property(t => t.SubText)
            .HasMaxLength(WorkSurface.SubTextLengthMax)
            .IsRequired();

        builder.Property(t => t.Icon)
            .IsRequired();

        builder.HasMany(x => x.Applications)
            .WithOne(x => x.WorkSurface)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(x => x.AppGroups)
            .WithOne(x => x.WorkSurface)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
