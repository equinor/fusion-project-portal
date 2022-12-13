using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.UpdateAppGroup;

public class UpdateAppGroupCommand : IRequest<Guid>
{
    public UpdateAppGroupCommand(Guid workSurfaceId, Guid appGroupId, string name, string accentColor)
    {
        WorkSurfaceId = workSurfaceId;
        AppGroupId = appGroupId;
        Name = name;
        AccentColor = accentColor;
    }

    public Guid WorkSurfaceId { get; set; }
    public Guid AppGroupId { get; set; }
    public string Name { get; set; }
    public string AccentColor { get; set; }

    public class Handler : IRequestHandler<UpdateAppGroupCommand, Guid>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task<Guid> Handle(UpdateAppGroupCommand command, CancellationToken cancellationToken)
        {
            var appGroup = await _readWriteContext.Set<WorkSurfaceAppGroup>()
                .FirstOrDefaultAsync(x => x.Id == command.AppGroupId && x.WorkSurfaceId == command.WorkSurfaceId, cancellationToken);

            if (appGroup == null)
            {
                throw new NotFoundException(nameof(appGroup));
            }

            appGroup.Update(command.Name, command.AccentColor);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return appGroup.Id;
        }
    }
}
