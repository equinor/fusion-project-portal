using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations;

public class WorkSurfaceAppConfiguration : IEntityTypeConfiguration<PortalApp>
{
    public void Configure(EntityTypeBuilder<PortalApp> builder)
    {
        builder.ConfigureCreationAudit();
        builder.ConfigureModificationAudit();
    }
}
