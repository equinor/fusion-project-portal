using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Infrastructure;

public interface IReadWriteContext : IDisposable
{
    DbSet<TEntity> Set<TEntity>() where TEntity : class;

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}