using Equinor.ProjectExecutionPortal.Application.Services.ContextService;
using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Portals.GetPortalAppKeys;

public class GetContextualAndGlobalAppKeysByPortalAndContextQuery : QueryBase<IList<string>>
{
    public GetContextualAndGlobalAppKeysByPortalAndContextQuery(Guid portalId, Guid contextId)
    {
        PortalId = portalId;
        ContextId = contextId;
    }

    public Guid PortalId { get; }
    public Guid ContextId { get; }

    public class Handler : IRequestHandler<GetContextualAndGlobalAppKeysByPortalAndContextQuery, IList<string>>
    {
        private readonly IReadWriteContext _readWriteContext;

        private readonly IContextService _contextService;

        public Handler(IReadWriteContext readWriteContext, IContextService contextService)
        {
            _readWriteContext = readWriteContext;

            _contextService = contextService;
        }

        public async Task<IList<string>> Handle(GetContextualAndGlobalAppKeysByPortalAndContextQuery request, CancellationToken cancellationToken)
        {
            var fusionContext = await _contextService.GetFusionContext(request.ContextId, cancellationToken);

            if (fusionContext is null)
            {
                throw new NotFoundException($"Invalid context-id: {request.ContextId}");
            }

            var portalWithContextualAndGlobalApps = await _readWriteContext.Set<Portal>()
                .AsNoTracking()
                .Include(portal => portal.Apps
                    .Where(app => app.OnboardedContext == null || (app.OnboardedContext.ExternalId == fusionContext.ExternalId && app.OnboardedContext.Type == fusionContext.Type.Name)))
                    .ThenInclude(app => app.OnboardedApp)
                    .ThenInclude(app => app.ContextTypes)
                .FirstOrDefaultAsync(x => x.Id == request.PortalId, cancellationToken);

            if (portalWithContextualAndGlobalApps is null)
            {
                throw new NotFoundException(nameof(Portal), request.PortalId);
            }

            var contextualAndGlobalPortalAppKeys = portalWithContextualAndGlobalApps.Apps
                .Where(apps => !apps.OnboardedApp.ContextTypes.Any() || apps.OnboardedApp.ContextTypes.Any(m => m.ContextTypeKey == fusionContext.Type.Name))
                .Select(app => app.OnboardedApp.AppKey)
                .ToList();

            return contextualAndGlobalPortalAppKeys;
        }
    }
}
