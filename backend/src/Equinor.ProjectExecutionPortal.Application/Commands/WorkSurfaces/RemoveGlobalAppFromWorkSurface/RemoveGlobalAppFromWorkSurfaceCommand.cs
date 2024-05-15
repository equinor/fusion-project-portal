﻿using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.RemoveGlobalAppFromWorkSurface;

public class RemoveGlobalAppFromWorkSurfaceCommand : IRequest
{
    public RemoveGlobalAppFromWorkSurfaceCommand(Guid workSurfaceId, string appKey)
    {
        WorkSurfaceId = workSurfaceId;
        AppKey = appKey;
    }

    public Guid WorkSurfaceId { get; }
    public string AppKey { get; }

    public class Handler : IRequestHandler<RemoveGlobalAppFromWorkSurfaceCommand>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task Handle(RemoveGlobalAppFromWorkSurfaceCommand command, CancellationToken cancellationToken)
        {
            var workSurfaceApp = await _readWriteContext.Set<PortalApp>()
                .Include(x => x.OnboardedApp)
                .FirstOrDefaultAsync(x =>
                        x.WorkSurfaceId == command.WorkSurfaceId
                        && x.OnboardedContextId == null
                        && x.OnboardedApp.AppKey == command.AppKey,
                    cancellationToken);

            if (workSurfaceApp == null)
            {
                throw new NotFoundException(nameof(PortalApp), command.AppKey);
            }

            _readWriteContext.Set<PortalApp>().Remove(workSurfaceApp);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

        }
    }
}
