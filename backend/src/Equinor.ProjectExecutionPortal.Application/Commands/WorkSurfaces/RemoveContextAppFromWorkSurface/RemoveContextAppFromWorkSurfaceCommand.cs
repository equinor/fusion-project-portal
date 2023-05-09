using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.RemoveContextAppFromWorkSurface;

public class RemoveContextAppFromWorkSurfaceCommand : IRequest
{
    public RemoveContextAppFromWorkSurfaceCommand(Guid workSurfaceId, string contextExternalId, string appKey)
    {
        WorkSurfaceId = workSurfaceId;
        ContextExternalId = contextExternalId;
        AppKey = appKey;
    }

    public Guid WorkSurfaceId { get; }
    public string ContextExternalId { get; }
    public string AppKey { get; }

    public class Handler : IRequestHandler<RemoveContextAppFromWorkSurfaceCommand>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task<Unit> Handle(RemoveContextAppFromWorkSurfaceCommand command, CancellationToken cancellationToken)
        {
            var workSurfaceApp = await _readWriteContext.Set<WorkSurfaceApp>()
                .Include(x => x.OnboardedApp)
                .Include(x => x.OnboardedContext)
                .FirstOrDefaultAsync(x =>
                        x.OnboardedContext != null
                        && x.WorkSurfaceId == command.WorkSurfaceId
                        && x.OnboardedContext.ExternalId == command.ContextExternalId
                        && x.OnboardedApp.AppKey == command.AppKey,
                    cancellationToken);

            if (workSurfaceApp == null)
            {
                throw new NotFoundException(nameof(WorkSurfaceApp), command.AppKey);
            }

            _readWriteContext.Set<WorkSurfaceApp>().Remove(workSurfaceApp);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
