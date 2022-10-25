using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations;

public class WorkSurfaceApplicationConfiguration : IEntityTypeConfiguration<WorkSurfaceApplication>
{
    public void Configure(EntityTypeBuilder<WorkSurfaceApplication> builder)
    {
        builder.ConfigureContext();
        builder.ConfigureCreationAudit();
        builder.ConfigureModificationAudit();

        builder.Property(t => t.AppKey)
            .HasMaxLength(WorkSurfaceApplication.AppKeyLengthMax)
            .IsRequired();
    }
}
