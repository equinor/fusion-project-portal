using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.AddWorkSurfaceApp;

public class AddWorkSurfaceAppCommand : IRequest<Guid>
{
    public AddWorkSurfaceAppCommand(Guid workSurfaceId, string? contextExternalId, string? contextType, string appKey, Guid? appGroupId, int order)
    {
        WorkSurfaceId = workSurfaceId;
        ContextExternalId = contextExternalId;
        ContextType = contextType;
        AppKey = appKey;
        Order = order;
        AppGroupId = appGroupId;
    }

    public Guid WorkSurfaceId { get; }
    public string? ContextExternalId { get; }
    public string? ContextType { get; }
    public string AppKey { get; set; }
    public Guid? AppGroupId { get; set; }
    public int Order { get; set; }

    public class Handler : IRequestHandler<AddWorkSurfaceAppCommand, Guid>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task<Guid> Handle(AddWorkSurfaceAppCommand command, CancellationToken cancellationToken)
        {
            // TODO: Do not add duplicates or if global already exist (what if a global is added after context specific have been added? Cleanup?)

            var workSurface = await _readWriteContext.Set<WorkSurface>()
                .FirstOrDefaultAsync(x => x.Id == command.WorkSurfaceId, cancellationToken);

            if (workSurface == null)
            {
                throw new NotFoundException(nameof(WorkSurface), command.WorkSurfaceId);
            }

            var onboardedApp = await _readWriteContext.Set<OnboardedApp>()
                .FirstOrDefaultAsync(x => x.AppKey == command.AppKey, cancellationToken);

            if (onboardedApp == null)
            {
                throw new NotFoundException(nameof(OnboardedApp), command.AppKey);
            }

            var workSurfaceApp = command.ContextExternalId != null && command.ContextType != null
                ? new WorkSurfaceApp(onboardedApp.Id, command.AppGroupId, command.Order, command.WorkSurfaceId, command.ContextExternalId, command.ContextType)
                : new WorkSurfaceApp(onboardedApp.Id, command.AppGroupId, command.Order, command.WorkSurfaceId);

            workSurface.AddApp(workSurfaceApp);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return workSurfaceApp.Id;
        }
    }
}
