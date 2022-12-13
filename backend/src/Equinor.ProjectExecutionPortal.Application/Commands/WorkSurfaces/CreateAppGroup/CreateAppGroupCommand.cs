using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.CreateAppGroup;

public class CreateAppGroupCommand : IRequest<Guid>
{
    public CreateAppGroupCommand(Guid workSurfaceId, string name, string accentColor)
    {
        WorkSurfaceId = workSurfaceId;
        Name = name;
        AccentColor = accentColor;
    }

    public Guid WorkSurfaceId { get; set; }
    public string Name { get; set; }
    public string AccentColor { get; set; }

    public class Handler : IRequestHandler<CreateAppGroupCommand, Guid>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task<Guid> Handle(CreateAppGroupCommand command, CancellationToken cancellationToken)
        {
            var workSurface = await _readWriteContext.Set<WorkSurface>()
                .Include(x => x.AppGroups)
                .FirstOrDefaultAsync(x => x.Id == command.WorkSurfaceId, cancellationToken);

            if (workSurface == null)
            {
                throw new NotFoundException(nameof(WorkSurface));
            }

            var appGroup = new WorkSurfaceAppGroup(command.Name, workSurface.AppGroups.Count, command.AccentColor);

            workSurface.AddAppGroup(appGroup);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return workSurface.Id;
        }
    }
}
