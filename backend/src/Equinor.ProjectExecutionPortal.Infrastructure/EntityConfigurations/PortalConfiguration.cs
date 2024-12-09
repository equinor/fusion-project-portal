using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations;

public class PortalConfiguration : IEntityTypeConfiguration<Portal>
{
    public void Configure(EntityTypeBuilder<Portal> builder)
    {
        builder.ConfigureCreationAudit();
        builder.ConfigureModificationAudit();

        builder
            .HasIndex(t => t.Key)
            .IsUnique();

        builder.Property(t => t.Key)
            .HasMaxLength(Portal.KeyLengthMax)
            .IsRequired();

        builder.Property(t => t.Name)
            .HasMaxLength(Portal.NameLengthMax)
            .IsRequired();

        builder.Property(t => t.ShortName)
            .HasMaxLength(Portal.ShortNameLengthMax)
            .IsRequired();

        builder.Property(t => t.SubText)
            .HasMaxLength(Portal.SubTextLengthMax)
            .IsRequired();

        builder.Property(t => t.Description)
            .HasMaxLength(Portal.DescriptionLengthMax);

        builder.Property(t => t.Icon)
            .IsRequired();

        builder.HasOne(x => x.Configuration)
            .WithOne(x => x.Portal)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(x => x.Apps)
            .WithOne(x => x.Portal)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(x => x.ContextTypes)
            .WithMany(x => x.Portals)
            .UsingEntity(join => join.ToTable("PortalContextTypes"));

        builder.HasOne(x => x.Configuration)
            .WithOne(x => x.Portal)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(x => x.Admins)
            .WithOne(x => x.Portal)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
