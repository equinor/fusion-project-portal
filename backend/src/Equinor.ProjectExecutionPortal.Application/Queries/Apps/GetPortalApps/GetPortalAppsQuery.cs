using AutoMapper;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Apps.GetPortalApps;

public class GetPortalAppsQuery : QueryBase<IList<WorkSurfaceApplication>>
{
    public GetPortalAppsQuery()
    {
    }

    public class Handler : IRequestHandler<GetPortalAppsQuery, IList<WorkSurfaceApplication>>
    {
        private readonly IReadWriteContext _context;

        public Handler(IReadWriteContext context)
        {
            _context = context;
        }

        public async Task<IList<WorkSurfaceApplication>> Handle(GetPortalAppsQuery request, CancellationToken cancellationToken)
        {
            return await _context.Set<WorkSurfaceApplication>()
                .AsNoTracking()
                .ToListAsync(cancellationToken);
            //.ProjectToListAsync<PortalAppDto>(_mapper.ConfigurationProvider);
        }
    }
}
