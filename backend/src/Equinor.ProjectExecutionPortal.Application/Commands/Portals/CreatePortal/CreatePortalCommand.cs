using Equinor.ProjectExecutionPortal.Application.Helpers;
using Equinor.ProjectExecutionPortal.Application.Services.ContextTypeService;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;

namespace Equinor.ProjectExecutionPortal.Application.Commands.Portals.CreatePortal;

public class CreatePortalCommand : IRequest<Guid>
{
    public CreatePortalCommand(string name, string shortName, string subText, string? description, string icon, IList<string> contextTypes)
    {
        Name = name;
        ShortName = shortName;
        SubText = subText;
        Description = description;
        Icon = icon;
        ContextTypes = contextTypes;
    }

    public string Name { get; set; }
    public string ShortName { get; set; }
    public string SubText { get; set; }
    public string? Description { get; set; }
    public string Icon { get; set; }
    public IList<string> ContextTypes { get; set; }

    public class Handler : IRequestHandler<CreatePortalCommand, Guid>
    {
        private readonly IContextTypeService _contextTypeService;
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext, IContextTypeService contextTypeService)
        {
            _readWriteContext = readWriteContext;
            _contextTypeService = contextTypeService;
        }

        public async Task<Guid> Handle(CreatePortalCommand command, CancellationToken cancellationToken)
        {
            var slug = SlugHelper.Sluggify(command.Name);

            var portal = new Portal(slug, command.Name, command.ShortName, command.SubText, command.Description, command.Icon);
           
            portal.AddContextTypes(await _contextTypeService.GetAllowedContextTypesByKeys(command.ContextTypes, cancellationToken));

            await _readWriteContext.Set<Portal>().AddAsync(portal, cancellationToken);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return portal.Id;
        }
    }
}
