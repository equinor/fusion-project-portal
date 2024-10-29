using Equinor.ProjectExecutionPortal.Application.Helpers;
using Equinor.ProjectExecutionPortal.Application.Services.ContextTypeService;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;

namespace Equinor.ProjectExecutionPortal.Application.Commands.Portals.CreatePortal;

public class CreatePortalCommand(
    string name,
    string shortName,
    string subText,
    string? description,
    string icon,
    IList<string> contextTypes)
    : IRequest<Guid>
{
    public string Name { get; set; } = name;
    public string ShortName { get; set; } = shortName;
    public string SubText { get; set; } = subText;
    public string? Description { get; set; } = description;
    public string Icon { get; set; } = icon;
    public IList<string> ContextTypes { get; set; } = contextTypes;

    public class Handler(IReadWriteContext readWriteContext, IContextTypeService contextTypeService) : IRequestHandler<CreatePortalCommand, Guid>
    {
        public async Task<Guid> Handle(CreatePortalCommand command, CancellationToken cancellationToken)
        {
            var slug = SlugHelper.Sluggify(command.Name);

            var portal = new Portal(slug, command.Name, command.ShortName, command.SubText, command.Description, command.Icon);

            portal.AddContextTypes(await contextTypeService.GetAllowedContextTypesByKeys(command.ContextTypes, cancellationToken));

            await readWriteContext.Set<Portal>().AddAsync(portal, cancellationToken);

            await readWriteContext.SaveChangesAsync(cancellationToken);

            return portal.Id;
        }
    }
}
