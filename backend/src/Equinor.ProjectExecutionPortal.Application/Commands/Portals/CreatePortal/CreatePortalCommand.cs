using Equinor.ProjectExecutionPortal.Application.Helpers;
using Equinor.ProjectExecutionPortal.Application.Services.AccountService;
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
        List<string> contextTypes,
        List<AccountIdentifier> admins)
    {
        Name = name;
        ShortName = shortName;
        SubText = subText;
        Description = description;
        Icon = icon;
        ContextTypes = contextTypes;
        Admins = admins;
    }

    public string Name { get; set; }
    public string ShortName { get; set; }
    public string SubText { get; set; }
    public string? Description { get; set; }
    public string Icon { get; set; }
    public List<string> ContextTypes { get; set; }
    public List<AccountIdentifier> Admins { get; }

    public class Handler : IRequestHandler<CreatePortalCommand, Guid>
    {
        private readonly IAccountService _accountService;
        private readonly IContextTypeService _contextTypeService;
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext, IContextTypeService contextTypeService, IAccountService accountService)
        {
            _readWriteContext = readWriteContext;
            _contextTypeService = contextTypeService;
            _accountService = accountService;
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

            portal.UpdateContextTypes(await _contextTypeService.GetAllowedContextTypesByKeys(command.ContextTypes, cancellationToken));

            var fusionProfiles = await _accountService.ResolveProfilesOrThrowAsync(command.Admins.ToList(), cancellationToken);

            var admins = command.Admins.Select(admin =>
            {
                var fusionProfile = fusionProfiles.FirstOrDefault(x => x.Profile!.AzureUniqueId == admin.AzureUniqueId)!.Profile;
                return new PortalAdmin { PortalId = portal.Id, AzureUniqueId = fusionProfile!.AzureUniqueId!.Value };
            }).ToList();

            portal.UpdateAdmins(admins);

            await _readWriteContext.Set<Portal>().AddAsync(portal, cancellationToken);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return portal.Id;
        }
    }
}
