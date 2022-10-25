using Equinor.ProjectExecutionPortal.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations;

public class PortalConfiguration : IEntityTypeConfiguration<Portal>
{
    public void Configure(EntityTypeBuilder<Portal> builder)
    {
        builder.Property(t => t.Name)
            .HasMaxLength(Portal.NameLengthMax)
            .IsRequired();

        builder.Property(t => t.Description)
            .HasMaxLength(Portal.DescriptionLengthMax)
            .IsRequired();

        builder.HasMany(x => x.WorkSurfaces)
            .WithOne(x => x.Portal)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
