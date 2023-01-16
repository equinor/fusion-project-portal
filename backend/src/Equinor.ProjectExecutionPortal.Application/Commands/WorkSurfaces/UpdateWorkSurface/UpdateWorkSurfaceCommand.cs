using Equinor.ProjectExecutionPortal.Application.Helpers;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.UpdateWorkSurface;

public class UpdateWorkSurfaceCommand : IRequest<Guid>
{
    public UpdateWorkSurfaceCommand(Guid id, string name, string shortName, string subText, string? description, int order, string icon)
    {
        Id = id;
        Name = name;
        ShortName = shortName;
        SubText = subText;
        Description = description;
        Order = order;
        Icon = icon;
    }

    public Guid Id { get; }
    public string Name { get; }
    public string ShortName { get; }
    public string SubText { get; }
    public string? Description { get; set; }
    public int Order { get; }
    public string Icon { get; }

    public class Handler : IRequestHandler<UpdateWorkSurfaceCommand, Guid>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task<Guid> Handle(UpdateWorkSurfaceCommand command, CancellationToken cancellationToken)
        {
            var entity = await _readWriteContext.Set<WorkSurface>()
                .FirstOrDefaultAsync(x => x.Id == command.Id, cancellationToken);

            if (entity == null)
            {
                throw new NotFoundException(nameof(WorkSurface), command.Id);
            }

            var slug = SlugHelper.Sluggify(command.Name);

            entity.Update(slug, command.Name, command.ShortName, command.SubText, command.Description, command.Order, command.Icon);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}
