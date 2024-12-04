using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations;

public class PortalAdminConfiguration : IEntityTypeConfiguration<PortalAdmin>
{
    public void Configure(EntityTypeBuilder<PortalAdmin> builder)
    {
        builder.ConfigureCreationAudit();

        builder.HasKey(x => x.Id);

        builder.HasOne(aa => aa.Account)
            .WithMany(t => t.PortalAdmins)
            .HasForeignKey(aa => aa.AccountId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
