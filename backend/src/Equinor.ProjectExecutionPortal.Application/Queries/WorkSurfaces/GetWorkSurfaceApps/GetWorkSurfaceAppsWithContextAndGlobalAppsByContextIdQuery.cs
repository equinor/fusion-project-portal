using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Application.Services.ContextService;
using Equinor.ProjectExecutionPortal.Application.Services.WorkSurfaceService;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaces.GetWorkSurfaceApps;

public class GetWorkSurfaceAppsWithContextAndGlobalAppsByContextIdQuery : QueryBase<WorkSurfaceDto?>
{

    public GetWorkSurfaceAppsWithContextAndGlobalAppsByContextIdQuery(Guid workSurfaceId, Guid contextId)
    {
        WorkSurfaceId = workSurfaceId;
        ContextId = contextId;
    }

    public Guid WorkSurfaceId { get; }
    public Guid ContextId { get; }

    public class Handler : IRequestHandler<GetWorkSurfaceAppsWithContextAndGlobalAppsByContextIdQuery, WorkSurfaceDto?>
    {
        private readonly IReadWriteContext _readWriteContext;
        private readonly IAppService _appService;
        private readonly IWorkSurfaceService _workSurfaceService;
        private readonly IMapper _mapper;
        private readonly IContextService _contextService;

        public Handler(IReadWriteContext readWriteContext, IAppService appService, IWorkSurfaceService workSurfaceService, IMapper mapper, IContextService contextService)
        {
            _readWriteContext = readWriteContext;
            _appService = appService;
            _workSurfaceService = workSurfaceService;
            _mapper = mapper;
            _contextService = contextService;
        }

        public async Task<WorkSurfaceDto?> Handle(GetWorkSurfaceAppsWithContextAndGlobalAppsByContextIdQuery request, CancellationToken cancellationToken)
        {
            var fusionContext = await _contextService.GetFusionContext(request.ContextId, cancellationToken);

            if (fusionContext == null)
            {
                throw new InvalidActionException($"Invalid context-id: {request.ContextId}");
            }

            var workSurface = await _readWriteContext.Set<WorkSurface>()
                .AsNoTracking()
                .Include(workSurface => workSurface.Apps.Where(app => app.OnboardedContext == null ||
                                                                      (app.OnboardedContext.ExternalId == fusionContext.ExternalId && app.OnboardedContext.Type == fusionContext.Type.Name)))
                .ThenInclude(app => app.OnboardedApp)
                .ThenInclude(app => app.ContextTypes)
                .FirstOrDefaultAsync(x => x.Id == request.WorkSurfaceId, cancellationToken);

            if (workSurface == null)
            {
                return null;
            }

            var workSurfaceDto = _mapper.Map<WorkSurface, WorkSurfaceDto>(workSurface);

            await _appService.EnrichAppsWithAllFusionAppData(workSurfaceDto.Apps.Select(workSurfaceAppDto => workSurfaceAppDto.OnboardedApp).ToList(), cancellationToken);
            
            return workSurfaceDto;
        }
    }
}
