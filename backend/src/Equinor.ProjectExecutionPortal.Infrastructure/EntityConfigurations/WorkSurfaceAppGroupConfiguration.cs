using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations;

public class WorkSurfaceAppGroupConfiguration : IEntityTypeConfiguration<AppGroup>
{
    public void Configure(EntityTypeBuilder<AppGroup> builder)
    {
        builder.ConfigureCreationAudit();
        builder.ConfigureModificationAudit();

        builder.Property(t => t.Name)
            .HasMaxLength(AppGroup.NameLengthMax)
            .IsRequired();

        builder.Property(t => t.AccentColor)
            .HasMaxLength(AppGroup.AccentColorLengthMax)
            .IsRequired();

        builder.HasMany(x => x.Apps)
            .WithOne(x => x.AppGroup)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
