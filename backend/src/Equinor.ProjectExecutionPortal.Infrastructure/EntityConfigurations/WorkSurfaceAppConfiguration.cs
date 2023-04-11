using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations;

public class WorkSurfaceAppConfiguration : IEntityTypeConfiguration<WorkSurfaceApp>
{
    public void Configure(EntityTypeBuilder<WorkSurfaceApp> builder)
    {
        builder.ConfigureContext(); // TODO: Remove
        builder.ConfigureCreationAudit();
        builder.ConfigureModificationAudit();
    }
}
