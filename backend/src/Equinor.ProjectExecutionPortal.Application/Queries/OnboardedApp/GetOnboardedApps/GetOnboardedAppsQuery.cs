using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApp.GetOnboardedApps;

public class GetOnboardedAppsQuery : QueryBase<IList<OnboardedAppDto>>
{
    public GetOnboardedAppsQuery()
    {
    }

    public class Handler : IRequestHandler<GetOnboardedAppsQuery, IList<OnboardedAppDto>>
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

        public async Task<IList<OnboardedAppDto>> Handle(GetOnboardedAppsQuery request, CancellationToken cancellationToken)
        {
            var enitity = await _context.Set<Domain.Entities.OnboardedApp>()
                .Include(x => x.AppGroup)
                .AsNoTracking()
                .ToListAsync(cancellationToken);

            var onboardedApps = _mapper.Map<List<Domain.Entities.OnboardedApp>, List<OnboardedAppDto>>(enitity);

            // TODO: Enrich with Fusion data

            return onboardedApps;
        }
    }
}
