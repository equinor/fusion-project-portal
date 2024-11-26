using Equinor.ProjectExecutionPortal.Application.Commands.Accounts.EnsureAccounts;
using Equinor.ProjectExecutionPortal.Application.Helpers;
using Equinor.ProjectExecutionPortal.Application.Services.ContextTypeService;
using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;

namespace Equinor.ProjectExecutionPortal.Application.Commands.Portals.CreatePortal;

public class CreatePortalCommand : IRequest<Guid>
{
    public CreatePortalCommand(string name,
        string shortName,
        string subText,
        string? description,
        string icon,
        IList<string> contextTypes,
        IList<AccountIdentifier> admins,
        IList<AccountIdentifier> owners)
    {
        Name = name;
        ShortName = shortName;
        SubText = subText;
        Description = description;
        Icon = icon;
        ContextTypes = contextTypes;
        Admins = admins;
        Owners = owners;
    }

    public string Name { get; set; }
    public string ShortName { get; set; }
    public string SubText { get; set; }
    public string? Description { get; set; }
    public string Icon { get; set; }
    public IList<string> ContextTypes { get; set; }
    public IList<AccountIdentifier> Admins { get; private set; }
    public IList<AccountIdentifier> Owners { get; private set; }

    public class Handler : IRequestHandler<CreatePortalCommand, Guid>
    {
        private readonly IReadWriteContext _readWriteContext;
        private readonly IContextTypeService _contextTypeService;
        private readonly ISender _mediator;

        public Handler(IReadWriteContext readWriteContext, IContextTypeService contextTypeService, ISender mediator)
        {
            _readWriteContext = readWriteContext;
            _contextTypeService = contextTypeService;
            _mediator = mediator;
        }

        public async Task<Guid> Handle(CreatePortalCommand command, CancellationToken cancellationToken)
        {
            var slug = SlugHelper.Sluggify(command.Name);

            var portal = new Portal(
                slug,
                command.Name,
                command.ShortName,
                command.SubText,
                command.Description,
                command.Icon);

            portal.AddContextTypes(await _contextTypeService.GetAllowedContextTypesByKeys(command.ContextTypes, cancellationToken));

            var accountIdentifiers = command.Admins.Concat(command.Owners).ToList();
            var accounts = await _mediator.Send(new EnsureAccountsCommand(accountIdentifiers), cancellationToken);

            foreach (var admin in command.Admins)
            {
                var account = accounts[admin];
                var portalAdmin = new PortalAdmin { Id = Guid.NewGuid(), PortalId = portal.Id, AccountId = account!.Id };

                portal.AddAdmin(portalAdmin);
            }

            foreach (var owner in command.Owners)
            {
                var account = accounts[owner];
                var portalOwner = new PortalOwner { Id = Guid.NewGuid(), PortalId = portal.Id, AccountId = account!.Id };

                portal.AddOwner(portalOwner);
            }

            await _readWriteContext.Set<Portal>().AddAsync(portal, cancellationToken);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return portal.Id;
        }
    }
}
