using Equinor.ProjectExecutionPortal.Domain.Common.Audit;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations.Extensions;

public static class AuditableConfigurationExtensions
{
    public static void ConfigureCreationAudit<TEntity>(this EntityTypeBuilder<TEntity> builder) where TEntity : class, ICreationAuditable
    {
        builder
            .Property(x => x.CreatedAtUtc)
            .HasConversion(ProjectExecutionPortalContext.DateTimeKindConverter);
    }

    public static void ConfigureModificationAudit<TEntity>(this EntityTypeBuilder<TEntity> builder) where TEntity : class, IModificationAuditable
    {
        builder
            .Property(x => x.ModifiedAtUtc)
            .HasConversion(ProjectExecutionPortalContext.DateTimeKindConverter);
    }
}
