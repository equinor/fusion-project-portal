using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations
{
    public class ContextTypeConfiguration : IEntityTypeConfiguration<ContextType>
    {
        public void Configure(EntityTypeBuilder<ContextType> builder)
        {
            builder.ConfigureCreationAudit();
            builder.ConfigureModificationAudit();

            builder
                .HasIndex(t => t.ContextTypeKey)
                .IsUnique();

            builder.Property(t => t.ContextTypeKey)
                .HasMaxLength(ContextType.ContextTypeKeyLengthMax)
                .IsRequired();
        }
    }
}
