using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations;

public class AccountConfiguration : IEntityTypeConfiguration<Account>
{
    public void Configure(EntityTypeBuilder<Account> builder)
    {
        builder.ConfigureCreationAudit();
        builder.ConfigureModificationAudit();

        builder
            .HasIndex(t => t.AzureUniqueId)
            .IsUnique();
    }
}
