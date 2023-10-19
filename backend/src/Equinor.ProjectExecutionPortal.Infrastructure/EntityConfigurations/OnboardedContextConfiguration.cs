using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations;

public class OnboardedContextConfiguration : IEntityTypeConfiguration<OnboardedContext>
{
    public void Configure(EntityTypeBuilder<OnboardedContext> builder)
    {
        builder.ConfigureCreationAudit();
        builder.ConfigureModificationAudit();

        builder
            .HasIndex(t => t.ExternalId)
            .IsUnique();

        builder.Property(t => t.ExternalId)
            .HasMaxLength(OnboardedContext.ExternalIdLengthMax);

        builder.Property(x => x.Type)
            .HasMaxLength(OnboardedContext.TypeLengthMax);

        builder.Property(t => t.Description)
            .HasMaxLength(OnboardedContext.DescriptionLengthMax);

        builder.HasMany(x => x.Apps)
            .WithOne(x => x.OnboardedContext)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
