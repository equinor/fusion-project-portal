using Equinor.ProjectExecutionPortal.Application.Helpers;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.UpdateWorkSurface;

public class UpdateWorkSurfaceCommand : IRequest<Guid>
{
    public UpdateWorkSurfaceCommand(Guid id, string name, string shortName, string subText, int order, string icon)
    {
        Id = id;
        Name = name;
        ShortName = shortName;
        SubText = subText;
        Order = order;
        Icon = icon;
    }

    public Guid Id { get; }
    public string Name { get; }
    public string ShortName { get; set; }
    public string SubText { get; set; }
    public int Order { get; set; }
    public string Icon { get; set; }

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

            entity.Update(slug, command.Name, command.ShortName, command.SubText, command.Order, command.Icon);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}
