using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Portal.GetPortalWithApps;

public class GetPortalWithAppsQuery : QueryBase<Domain.Entities.Portal>
{
    public GetPortalWithAppsQuery()
    {
    }

    public class Handler : IRequestHandler<GetPortalWithAppsQuery, Domain.Entities.Portal>
    {
        private readonly IReadWriteContext _context;

        public Handler(IReadWriteContext context)
        {
            _context = context;
        }

        public async Task<Domain.Entities.Portal> Handle(GetPortalWithAppsQuery request, CancellationToken cancellationToken)
        {
            // As of now, we should only have one portal

            return await _context.Set<Domain.Entities.Portal>()
                .Include(x => x.WorkSurfaces).ThenInclude(x => x.Applications)
                .AsNoTracking()
                .FirstOrDefaultAsync(cancellationToken) ?? throw new NotFoundException("Could not find any portals");
            //.ProjectToListAsync<PortalAppDto>(_mapper.ConfigurationProvider);
        }
    }
}
