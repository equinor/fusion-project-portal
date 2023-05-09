﻿using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.AddContextAppToWorkSurface;

public class AddContextAppToWorkSurfaceCommand : IRequest<Unit>
{
    public AddContextAppToWorkSurfaceCommand(Guid workSurfaceId, string contextExternalId, string appKey)
    {
        WorkSurfaceId = workSurfaceId;
        ContextExternalId = contextExternalId;
        AppKey = appKey;
    }

    public Guid WorkSurfaceId { get; }
    public string ContextExternalId { get; }
    public string AppKey { get; }

    public class Handler : IRequestHandler<AddContextAppToWorkSurfaceCommand, Unit>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task<Unit> Handle(AddContextAppToWorkSurfaceCommand command, CancellationToken cancellationToken)
        {
            if (command.ContextExternalId == null)
            {
                throw new InvalidActionException($"Cannot add global app '{command.AppKey} to '{command.WorkSurfaceId}'. Missing context parameters.");
            }

            var onboardedContext = await _readWriteContext.Set<OnboardedContext>()
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.ExternalId == command.ContextExternalId, cancellationToken);

            if (onboardedContext == null)
            {
                throw new NotFoundException("Could not find any onboarded context with that id", command.ContextExternalId);
            }

            var onboardedApp = await _readWriteContext.Set<OnboardedApp>()
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.AppKey == command.AppKey, cancellationToken);

            if (onboardedApp == null)
            {
                throw new NotFoundException("Could not find any onboarded app with that id", command.AppKey);
            }

            var workSurfaceWithContextApps = await _readWriteContext.Set<WorkSurface>()
                .Include(x => x.Apps
                    .Where(wsApp => wsApp.OnboardedContext == null || wsApp.OnboardedContext.ExternalId == command.ContextExternalId))
                    .ThenInclude(x => x.OnboardedContext)
                .FirstOrDefaultAsync(x => x.Id == command.WorkSurfaceId, cancellationToken);

            if (workSurfaceWithContextApps == null)
            {
                throw new NotFoundException(nameof(WorkSurface), command.WorkSurfaceId);
            }

            if (workSurfaceWithContextApps.HasApp(onboardedApp.Id))
            {
                throw new InvalidActionException($"App {onboardedApp.AppKey} have already been added to this Work Surface. Either globally or with the supplied context");
            }

            var workSurfaceApp = new WorkSurfaceApp(onboardedApp.Id, command.WorkSurfaceId, onboardedContext.Id);

            workSurfaceWithContextApps.AddApp(workSurfaceApp);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
