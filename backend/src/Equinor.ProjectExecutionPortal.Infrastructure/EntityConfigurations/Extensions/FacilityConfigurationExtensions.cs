using Equinor.ProjectExecutionPortal.Domain.Common;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Equinor.ProjectExecutionPortal.Infrastructure.EntityConfigurations.Extensions;

public static class FacilityConfigurationExtensions
{
    public static void ConfigureFacility<TEntity>(this EntityTypeBuilder<TEntity> builder) where TEntity : FacilityEntityBase =>
        builder.Property(x => x.Facility)
            .HasMaxLength(FacilityEntityBase.FacilityLengthMax)
            .IsRequired();
}
