using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.AddWorkSurfaceApp;

public class AddWorkSurfaceAppCommand : IRequest<Guid>
{
    public AddWorkSurfaceAppCommand(Guid workSurfaceId, string? externalContextId, string appKey, Guid? appGroupId, int order)
    {
        WorkSurfaceId = workSurfaceId;
        ExternalContextId = externalContextId;
        AppKey = appKey;
        Order = order;
        AppGroupId = appGroupId;
    }

    public Guid WorkSurfaceId { get; }
    public string? ExternalContextId { get; }
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

            workSurface.AddApp(new WorkSurfaceApp(onboardedApp.Id, command.AppGroupId, command.Order, command.WorkSurfaceId)); // TODO: Context

            // If no context is provided, the app is added globally

            // If context, only add app for certain context

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return workSurface.Id;
        }
    }
}
