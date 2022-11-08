using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.RemoveWorkSurfaceApp;

public class RemoveWorkSurfaceAppCommand : IRequest
{
    public RemoveWorkSurfaceAppCommand(Guid workSurfaceId, string? externalContextId, string appKey)
    {
        WorkSurfaceId = workSurfaceId;
        ExternalContextId = externalContextId;
        AppKey = appKey;
    }

    public Guid WorkSurfaceId { get; }
    public string? ExternalContextId { get; }
    public string AppKey { get; set; }

    public class Handler : IRequestHandler<RemoveWorkSurfaceAppCommand>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task<Unit> Handle(RemoveWorkSurfaceAppCommand command, CancellationToken cancellationToken)
        {
            if (command.ExternalContextId != null)
            {
                await RemoveContextAppFromWorkSurface(command.WorkSurfaceId, command.ExternalContextId, command.AppKey, cancellationToken);
            }
            else
            {
                await RemoveGlobalAppFromWorkSurface(command.WorkSurfaceId, command.AppKey, cancellationToken);
            }

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }

        private async Task RemoveGlobalAppFromWorkSurface(Guid workSurfaceId, string appKey, CancellationToken cancellationToken)
        {
            var entity = await _readWriteContext.Set<WorkSurfaceApp>()
                .Include(x => x.OnboardedApp)
                .FirstOrDefaultAsync(x =>
                        x.Id == workSurfaceId
                        && x.ExternalId == null // TODO: make nullable
                        && x.OnboardedApp.AppKey == appKey,
                    cancellationToken);

            if (entity == null)
            {
                throw new NotFoundException(nameof(WorkSurfaceApp), appKey);
            }

            _readWriteContext.Set<WorkSurfaceApp>().Remove(entity);
        }

        private async Task RemoveContextAppFromWorkSurface(Guid workSurfaceId, string externalContextId, string appKey, CancellationToken cancellationToken)
        {
            var entity = await _readWriteContext.Set<WorkSurfaceApp>()
            .Include(x => x.OnboardedApp)
            .FirstOrDefaultAsync(x =>
                        x.Id == workSurfaceId
                        && x.ExternalId == externalContextId
                        && x.OnboardedApp.AppKey == appKey,
                cancellationToken);

            if (entity == null)
            {
                throw new NotFoundException(nameof(WorkSurfaceApp), appKey);
            }

            _readWriteContext.Set<WorkSurfaceApp>().Remove(entity);
        }
    }
}
