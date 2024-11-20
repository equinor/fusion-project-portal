using Equinor.ProjectExecutionPortal.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations;

public class PortalOwnerConfiguration : IEntityTypeConfiguration<PortalOwner>
{
    public void Configure(EntityTypeBuilder<PortalOwner> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id).ValueGeneratedNever();

        builder.HasOne<Portal>()
            .WithMany(x => x.Owners)
            .HasForeignKey(aa => aa.PortalId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(aa => aa.Account)
            .WithMany(t => t.PortalOwners)
            .HasForeignKey(aa => aa.AccountId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
