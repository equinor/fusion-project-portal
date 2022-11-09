﻿using Equinor.ProjectExecutionPortal.Domain.Common;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations.Extensions;

public static class ContextConfigurationExtensions
{
    public static void ConfigureContext<TEntity>(this EntityTypeBuilder<TEntity> builder)
        where TEntity : ContextEntityBase
    {
        builder.Property(x => x.ExternalId)
            .HasMaxLength(ContextEntityBase.ExternalIdLengthMax);

        builder.Property(x => x.Type)
            .HasMaxLength(ContextEntityBase.TypeLengthMax);
    }
}
