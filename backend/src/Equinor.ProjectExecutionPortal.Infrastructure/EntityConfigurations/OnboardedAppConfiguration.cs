using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations;

public class OnboardedAppConfiguration : IEntityTypeConfiguration<OnboardedApp>
{
    public void Configure(EntityTypeBuilder<OnboardedApp> builder)
    {
        builder.ConfigureCreationAudit();
        builder.ConfigureModificationAudit();

        builder
            .HasIndex(t => t.AppKey)
            .IsUnique();

        builder.Property(t => t.AppKey)
            .HasMaxLength(OnboardedApp.AppKeyLengthMax)
            .IsRequired();
    }
}
