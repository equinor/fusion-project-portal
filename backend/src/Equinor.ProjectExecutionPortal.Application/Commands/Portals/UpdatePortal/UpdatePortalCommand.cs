using Equinor.ProjectExecutionPortal.Application.Commands.Accounts.EnsureAccounts;
using Equinor.ProjectExecutionPortal.Application.Helpers;
using Equinor.ProjectExecutionPortal.Application.Services.ContextTypeService;
using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.Portals.UpdatePortal;

public class UpdatePortalCommand : IRequest<Guid>
{
    public UpdatePortalCommand(
        Guid id,
        string name,
        string shortName,
        string subText,
        string? description,
        string icon,
        IList<string> contextTypes,
        IList<AccountIdentifier> admins)
    {
        Id = id;
        Name = name;
        ShortName = shortName;
        SubText = subText;
        Description = description;
        Icon = icon;
        ContextTypes = contextTypes;
        Admins = admins;
    }

    public Guid Id { get; }
    public string Name { get; }
    public string ShortName { get; }
    public string SubText { get; }
    public string? Description { get; }
    public string Icon { get; }
    public IList<string> ContextTypes { get; }
    public IList<AccountIdentifier> Admins { get; private set; }

    public class Handler : IRequestHandler<UpdatePortalCommand, Guid>
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

        public async Task<Guid> Handle(UpdatePortalCommand command, CancellationToken cancellationToken)
        {
            var portal = await _readWriteContext.Set<Portal>()
                .Include(portal => portal.ContextTypes)
                .Include(portal => portal.Admins)
                    .ThenInclude(x => x.Account)
                .FirstOrDefaultAsync(portal => portal.Id == command.Id, cancellationToken);

            if (portal is null)
            {
                throw new NotFoundException(nameof(Portal), command.Id);
            }

            var slug = SlugHelper.Sluggify(command.Name);

            portal.Update(slug, command.Name, command.ShortName, command.SubText, command.Description, command.Icon);

            portal.UpdateContextTypes(await _contextTypeService.GetAllowedContextTypesByKeys(command.ContextTypes, cancellationToken));

            var accounts = await _mediator.Send(new EnsureAccountsCommand(command.Admins.ToList()), cancellationToken);

            var admins = command.Admins.Select(admin =>
            {
                var account = accounts[admin];
                return new PortalAdmin { Id = Guid.NewGuid(), PortalId = portal.Id, AccountId = account!.Id };
            }).ToList();

            portal.UpdateAdmins(admins);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return portal.Id;
        }
    }
}
