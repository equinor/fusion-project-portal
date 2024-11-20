using Equinor.ProjectExecutionPortal.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations;

public class AccountConfiguration : IEntityTypeConfiguration<Account>
{
    public void Configure(EntityTypeBuilder<Account> builder)
    {
        builder
            .HasIndex(t => t.AzureUniqueId)
            .IsUnique();

        builder
            .HasIndex(t => t.Mail);

        builder.Property(t => t.Mail)
            .HasMaxLength(200);

        builder.Property(t => t.DisplayName)
            .HasMaxLength(250)
            .IsRequired();

        builder.Property(t => t.UPN)
            .HasMaxLength(200);

        builder.Property(t => t.AccountType)
            .HasMaxLength(30);

        builder.Property(t => t.AccountClassification)
            .HasMaxLength(30);
    }
}
