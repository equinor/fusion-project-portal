using AutoMapper;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Apps.GetPortalApps;

public class GetPortalAppsQuery : QueryBase<IList<PortalAppDto>>
{
    public GetPortalAppsQuery()
    {
    }

    public class Handler : IRequestHandler<GetPortalAppsQuery, IList<PortalAppDto>>
    {
        private readonly IReadWriteContext _context;
        private readonly IMapper _mapper;

        public Handler(IReadWriteContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IList<PortalAppDto>> Handle(GetPortalAppsQuery request, CancellationToken cancellationToken)
        {
            return await _context.Set<WorkSurfaceApplication>()
                .AsNoTracking()
                .ProjectToListAsync<PortalAppDto>(_mapper.ConfigurationProvider);
        }
    }
}
