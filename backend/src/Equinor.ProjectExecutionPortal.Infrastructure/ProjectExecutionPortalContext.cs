using System.Reflection;
using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Domain.Interfaces;
using Equinor.ProjectExecutionPortal.Infrastructure.Converters;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Infrastructure;

public class ProjectExecutionPortalContext : DbContext, IReadWriteContext
{
    private readonly IEventDispatcher _eventDispatcher;
    private readonly ICurrentUserProvider _currentUserProvider;

    public ProjectExecutionPortalContext(
        DbContextOptions<ProjectExecutionPortalContext> options,
        IEventDispatcher eventDispatcher,
        ICurrentUserProvider currentUserProvider)
        : base(options)
    {
        _eventDispatcher = eventDispatcher;
        _currentUserProvider = currentUserProvider;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }

    public static DateTimeKindConverter DateTimeKindConverter { get; } = new();

    public DbSet<Portal> Portals { get; init; }
    public DbSet<PortalApp> PortalApps { get; init; }
    public DbSet<OnboardedApp> OnboardedApps { get; init; }
    public DbSet<OnboardedContext> OnboardedContexts { get; init; }
    public DbSet<ContextType> ContextTypes { get; init; }
    public DbSet<Account> Accounts { get; init; }
    public DbSet<PortalOwner> PortalOwners { get; init; }
    public DbSet<PortalAdmin> PortalAdmins { get; init; }
 
    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        await DispatchEventsAsync(cancellationToken);
        SetAuditData();

        try
        {
            return await base.SaveChangesAsync(cancellationToken);
        }
        catch (DbUpdateConcurrencyException concurrencyException)
        {
            throw new ConcurrencyException("Data store operation failed. Data may have been modified or deleted since entities were loaded.", concurrencyException);
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

    private void SetAuditData()
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
