using System.Reflection;
using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;
using Equinor.ProjectExecutionPortal.Domain.Common.Events.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Domain.Interfaces;
using Equinor.ProjectExecutionPortal.Infrastructure.Converters;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Infrastructure;

public class ProjectExecutionPortalContext : DbContext, IReadWriteContext
{
    private readonly IContextProvider _contextProvider;
    private readonly IEventDispatcher _eventDispatcher;
    private readonly ICurrentUserProvider _currentUserProvider;

    public ProjectExecutionPortalContext(
        DbContextOptions<ProjectExecutionPortalContext> options,
        IContextProvider contextProvider,
        IEventDispatcher eventDispatcher,
        ICurrentUserProvider currentUserProvider)
        : base(options)
    {
        _contextProvider = contextProvider;
        _eventDispatcher = eventDispatcher;
        _currentUserProvider = currentUserProvider;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        SetGlobalContextFilter(modelBuilder);
    }

    public static DateTimeKindConverter DateTimeKindConverter { get; } = new();

    public virtual DbSet<Portal> Portals { get; set; }
    public virtual DbSet<WorkSurface> WorkSurfaces { get; set; }
    public virtual DbSet<WorkSurfaceApplication> WorkSurfaceApplications { get; set; }
    public virtual DbSet<WorkSurfaceAppGroup> WorkSurfaceAppGroups { get; set; }

    public void SetGlobalQueryFilter<T>(ModelBuilder builder) where T : ContextEntityBase =>
        builder
            .Entity<T>()
            .HasQueryFilter(e => e.ContextId == _contextProvider.ContextId || _contextProvider.IsCrossContextQuery);

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        await DispatchEventsAsync(cancellationToken);
        await SetAuditDataAsync();

        try
        {
            return await base.SaveChangesAsync(cancellationToken);
        }
        catch (DbUpdateConcurrencyException concurrencyException)
        {
            throw new ConcurrencyException("Data store operation failed. Data may have been modified or deleted since entities were loaded.", concurrencyException);
        }
    }

    private void SetGlobalContextFilter(ModelBuilder modelBuilder)
    {
        // Set global query filter on entities inheriting from ContextEntityBase
        // https://gunnarpeipman.com/ef-core-global-query-filters/
        foreach (var type in TypeProvider.GetEntityTypes(typeof(IDomainMarker).GetTypeInfo().Assembly, typeof(ContextEntityBase)))
        {
            typeof(ProjectExecutionPortalContext)
                .GetMethod(nameof(SetGlobalQueryFilter))
                ?.MakeGenericMethod(type)
                .Invoke(this, new object[] { modelBuilder });
        }
    }

    private async Task DispatchEventsAsync(CancellationToken cancellationToken = default)
    {
        var entities = ChangeTracker
            .Entries<EntityBase>()
            .Where(x => x.Entity.DomainEvents.Any())
            .Select(x => x.Entity);
        await _eventDispatcher.DispatchAsync(entities, cancellationToken);
    }

    private async Task SetAuditDataAsync()
    {
        var addedEntries = ChangeTracker
            .Entries<ICreationAuditable>()
            .Where(x => x.State == EntityState.Added)
            .ToList();
        var modifiedEntries = ChangeTracker
            .Entries<IModificationAuditable>()
            .Where(x => x.State == EntityState.Modified)
            .ToList();

        if (addedEntries.Any() || modifiedEntries.Any())
        {
            var currentUserOid = _currentUserProvider.GetCurrentUserOid();

            foreach (var entry in addedEntries)
            {
                entry.Entity.SetCreated(currentUserOid);
            }

            foreach (var entry in modifiedEntries)
            {
                entry.Entity.SetModified(currentUserOid);
            }
        }
    }
}
