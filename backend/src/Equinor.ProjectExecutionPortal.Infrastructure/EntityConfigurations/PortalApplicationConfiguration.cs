using Equinor.ProjectExecutionPortal.Infrastructure.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations;

public class PortalApplicationConfiguration : IEntityTypeConfiguration<WorkSurfaceApplication>
{
    public void Configure(EntityTypeBuilder<WorkSurfaceApplication> builder)
    {
        builder.ConfigureFacility();
    }
}
