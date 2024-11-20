﻿using Equinor.ProjectExecutionPortal.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations;

public class PortalAdminConfiguration : IEntityTypeConfiguration<PortalAdmin>
{
    public void Configure(EntityTypeBuilder<PortalAdmin> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id).ValueGeneratedNever();

        builder.HasOne<Portal>()
            .WithMany(x => x.Admins)
            .HasForeignKey(aa => aa.PortalId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(aa => aa.Account)
            .WithMany(t => t.PortalAdmins)
            .HasForeignKey(aa => aa.AccountId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
