using Equinor.ProjectExecutionPortal.Application.Helpers;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.CreateWorkSurface;

public class CreateWorkSurfaceCommand : IRequest<Guid>
{
    public CreateWorkSurfaceCommand(string name, string shortName, string subText, string? description, int order, string icon)
    {
        Name = name;
        ShortName = shortName;
        SubText = subText;
        Description = description;
        Order = order;
        Icon = icon;
    }

    public string Name { get; set; }
    public string ShortName { get; set; }
    public string SubText { get; set; }
    public string? Description { get; set; }
    public int Order { get; set; }
    public string Icon { get; set; }

    public class Handler : IRequestHandler<CreateWorkSurfaceCommand, Guid>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task<Guid> Handle(CreateWorkSurfaceCommand command, CancellationToken cancellationToken)
        {
            var portal = await _readWriteContext.Set<Portal>().FirstOrDefaultAsync(cancellationToken);

            // Only one portal for now
            if (portal == null)
            {
                throw new NotFoundException(nameof(Portal));
            }

            var slug = SlugHelper.Sluggify(command.Name);

            var workSurface = new WorkSurface(slug, command.Name, command.ShortName, command.SubText, command.Description, command.Order, command.Icon)
            {
                PortalId = portal.Id
            };

            await _readWriteContext.Set<WorkSurface>().AddAsync(workSurface, cancellationToken);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return workSurface.Id;
        }
    }
}
