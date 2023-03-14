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

        builder.Property(t => t.Title)
            .HasMaxLength(OnboardedContext.TitleLengthMax);

        builder.Property(t => t.Description)
            .HasMaxLength(OnboardedContext.DescriptionLengthMax);
    }
}
