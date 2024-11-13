using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApps.GetOnboardedApp;

public class GetOnboardedAppQuery : QueryBase<OnboardedAppDto?>
{
    public GetOnboardedAppQuery(string appKey)
    {
        AppKey = appKey;
    }

    public string AppKey { get; set; }

    public class Handler : IRequestHandler<GetOnboardedAppQuery, OnboardedAppDto?>
    {
        private readonly IReadWriteContext _context;
        private readonly IMapper _mapper;
        private readonly IAppService _appService;

        public Handler(IReadWriteContext context, IMapper mapper, IAppService appService)
        {
            _context = context;
            _mapper = mapper;
            _appService = appService;
        }

        public async Task<OnboardedAppDto?> Handle(GetOnboardedAppQuery request, CancellationToken cancellationToken)
        {
            var entity = await _context.Set<OnboardedApp>()
                .Include(x => x.ContextTypes)
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.AppKey == request.AppKey, cancellationToken);

            if (entity == null)
            {
                return null;
            }

            var onboardedApp = _mapper.Map<OnboardedApp, OnboardedAppDto>(entity);

            await _appService.EnrichWithFusionAppData(onboardedApp, cancellationToken);

            return onboardedApp;
        }
    }
}
