﻿using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.AddGlobalAppToWorkSurface;

public class AddGlobalAppToWorkSurfaceCommand : IRequest<Unit>
{
    public AddGlobalAppToWorkSurfaceCommand(Guid workSurfaceId, string appKey)
    {
        WorkSurfaceId = workSurfaceId;
        AppKey = appKey;
    }

    public Guid WorkSurfaceId { get; }
    public string AppKey { get; }

    public class Handler : IRequestHandler<AddGlobalAppToWorkSurfaceCommand, Unit>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task<Unit> Handle(AddGlobalAppToWorkSurfaceCommand command, CancellationToken cancellationToken)
        {
            var workSurfaceWithGlobalApps = await _readWriteContext.Set<WorkSurface>()
                .Include(x => x.Apps.Where(app => app.OnboardedContextId == null))
                .FirstOrDefaultAsync(x => x.Id == command.WorkSurfaceId, cancellationToken);

            if (workSurfaceWithGlobalApps == null)
            {
                throw new NotFoundException(nameof(WorkSurface), command.WorkSurfaceId);
            }

            var onboardedApp = await _readWriteContext.Set<OnboardedApp>()
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.AppKey == command.AppKey, cancellationToken);

            if (onboardedApp == null)
            {
                throw new NotFoundException("Could not find any onboarded app with that id", command.AppKey);
            }

            if (workSurfaceWithGlobalApps.HasApp(onboardedApp.Id))
            {
                throw new InvalidActionException($"App {onboardedApp.AppKey} have already been added to this Work Surface.");
            }

            var workSurfaceApp = new WorkSurfaceApp(onboardedApp.Id, command.WorkSurfaceId);

            workSurfaceWithGlobalApps.AddApp(workSurfaceApp);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
