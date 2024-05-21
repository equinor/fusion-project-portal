using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Application.Services.ContextService;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaces.GetWorkSurfaceApps;

public class GetWorkSurfaceAppsWithContextAndGlobalAppsByContextIdQuery : QueryBase<IList<WorkSurfaceAppDto?>>
{

    public GetWorkSurfaceAppsWithContextAndGlobalAppsByContextIdQuery(Guid workSurfaceId, Guid contextId)
    {
        WorkSurfaceId = workSurfaceId;
        ContextId = contextId;
    }

    public Guid WorkSurfaceId { get; }
    public Guid ContextId { get; }

    public class Handler : IRequestHandler<GetWorkSurfaceAppsWithContextAndGlobalAppsByContextIdQuery, IList<WorkSurfaceAppDto?>>
    {
        private readonly IReadWriteContext _readWriteContext;
        private readonly IAppService _appService;
        private readonly IMapper _mapper;
        private readonly IContextService _contextService;

        public Handler(IReadWriteContext readWriteContext, IAppService appService, IMapper mapper, IContextService contextService)
        {
            _readWriteContext = readWriteContext;
            _appService = appService;
            _mapper = mapper;
            _contextService = contextService;
        }

        public async Task<IList<WorkSurfaceAppDto?>> Handle(GetWorkSurfaceAppsWithContextAndGlobalAppsByContextIdQuery request, CancellationToken cancellationToken)
        {
            //TODO: Improve error handling
            var fusionContext = await _contextService.GetFusionContext(request.ContextId, cancellationToken);

            if (fusionContext == null)
            {
                throw new InvalidActionException($"Invalid context-id: {request.ContextId}");
            }

            var workSurface = await _readWriteContext.Set<Portal>()
                .AsNoTracking()
                .Include(workSurface => workSurface.Apps.Where(app => app.OnboardedContext == null || (app.OnboardedContext.ExternalId == fusionContext.ExternalId && app.OnboardedContext.Type == fusionContext.Type.Name)))
                .ThenInclude(app => app.OnboardedApp)
                .ThenInclude(app => app.ContextTypes)
                .FirstOrDefaultAsync(x => x.Id == request.WorkSurfaceId, cancellationToken);

            if (workSurface == null)
            {
                return null;
            }

            var workSurfaceApps = workSurface.Apps.Where(apps => apps.OnboardedApp.ContextTypes.Count == 0 || apps.OnboardedApp.ContextTypes.Any(m => m.ContextTypeKey == fusionContext.Type.Name)).ToList();
            
            var workSurfaceAppsDto = _mapper.Map<List<PortalApp>, List<WorkSurfaceAppDto>>(workSurfaceApps);
            
            await _appService.EnrichAppsWithAllFusionAppData(workSurfaceAppsDto.Select(workSurfaceAppDto => workSurfaceAppDto.OnboardedApp).ToList(), cancellationToken);

            return workSurfaceAppsDto;
        }
    }
}
