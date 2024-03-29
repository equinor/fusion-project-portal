﻿using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Application.Services.WorkSurfaceService;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaces.GetWorkSurfaceApps;

public class GetWorkSurfaceAppsQuery : QueryBase<WorkSurfaceDto?>
{
    public GetWorkSurfaceAppsQuery(Guid workSurfaceId)
    {
        WorkSurfaceId = workSurfaceId;
    }

    public Guid WorkSurfaceId { get; }

    public class Handler : IRequestHandler<GetWorkSurfaceAppsQuery, WorkSurfaceDto?>
    {
        private readonly IReadWriteContext _readWriteContext;
        private readonly IAppService _appService;
        private readonly IWorkSurfaceService _workSurfaceService;
        private readonly IMapper _mapper;

        public Handler(IReadWriteContext readWriteContext, IAppService appService, IWorkSurfaceService workSurfaceService, IMapper mapper)
        {
            _readWriteContext = readWriteContext;
            _appService = appService;
            _workSurfaceService = workSurfaceService;
            _mapper = mapper;
        }

        public async Task<WorkSurfaceDto?> Handle(GetWorkSurfaceAppsQuery request, CancellationToken cancellationToken)
        {
            var workSurface = await _readWriteContext.Set<WorkSurface>()
                .AsNoTracking()
                .Include(workSurface => workSurface.Apps)
                .ThenInclude(workSurfaceApp => workSurfaceApp.OnboardedApp)
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
