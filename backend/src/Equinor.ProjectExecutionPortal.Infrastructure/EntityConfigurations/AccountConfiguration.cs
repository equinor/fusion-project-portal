﻿using Equinor.ProjectExecutionPortal.Domain.Entities;
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

        builder.Property(t => t.AccountType)
            .HasMaxLength(Account.AccountTypeLengthMax);

        builder.Property(t => t.AccountClassification)
            .HasMaxLength(Account.AccountClassificationLengthMax);
    }
}
