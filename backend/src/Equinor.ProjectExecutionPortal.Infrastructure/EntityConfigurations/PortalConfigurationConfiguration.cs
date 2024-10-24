﻿using Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations;

public class PortalConfigurationConfiguration : IEntityTypeConfiguration<Domain.Entities.PortalConfiguration>
{
    public void Configure(EntityTypeBuilder<Domain.Entities.PortalConfiguration> builder)
    {
        builder.ConfigureCreationAudit();
        builder.ConfigureModificationAudit();

        builder.Property(t => t.Router)
            .HasMaxLength(Domain.Entities.PortalConfiguration.RouterLengthMax);

        builder.Property(t => t.Extension)
            .HasMaxLength(Domain.Entities.PortalConfiguration.ExtensionLengthMax);

        builder.Property(t => t.Environment)
            .HasMaxLength(Domain.Entities.PortalConfiguration.EnvironmentLengthMax);
    }
}
