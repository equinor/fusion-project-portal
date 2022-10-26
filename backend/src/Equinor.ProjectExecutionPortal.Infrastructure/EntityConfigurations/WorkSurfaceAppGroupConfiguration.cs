using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations;

public class WorkSurfaceAppGroupConfiguration : IEntityTypeConfiguration<WorkSurfaceAppGroup>
{
    public void Configure(EntityTypeBuilder<WorkSurfaceAppGroup> builder)
    {
        builder.ConfigureContext();
        builder.ConfigureCreationAudit();
        builder.ConfigureModificationAudit();

        builder.Property(t => t.Name)
            .HasMaxLength(WorkSurfaceAppGroup.NameLengthMax)
            .IsRequired();

        builder.Property(t => t.AccentColor)
            .HasMaxLength(WorkSurfaceAppGroup.AccentColorLengthMax)
            .IsRequired();

        builder.HasMany(x => x.Applications)
            .WithOne(x => x.AppGroup)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
