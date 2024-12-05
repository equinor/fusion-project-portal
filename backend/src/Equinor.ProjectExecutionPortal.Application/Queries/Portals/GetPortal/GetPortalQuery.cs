using AutoMapper;
using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Portals.GetPortal;

public class GetPortalQuery : QueryBase<PortalDto?>
{
    public GetPortalQuery(Guid portalId)
    {
        PortalId = portalId;
    }

    public Guid PortalId { get; }

    public class Handler : IRequestHandler<GetPortalQuery, PortalDto?>
    {
        private readonly IReadWriteContext _readWriteContext;
        private readonly IMapper _mapper;

        public Handler(IReadWriteContext readWriteContext, IMapper mapper)
        {
            _readWriteContext = readWriteContext;
            _mapper = mapper;
        }

        public async Task<PortalDto?> Handle(GetPortalQuery request, CancellationToken cancellationToken)
        {
            var entity = await _readWriteContext.Set<Portal>()
            .AsNoTracking()
            .Include(x => x.ContextTypes)
            .Include(x => x.Configuration)
            .Include(x => x.Admins)
            .FirstOrDefaultAsync(x => x.Id == request.PortalId, cancellationToken);

            var portal = _mapper.Map<Portal?, PortalDto?>(entity);

            return portal;
        }
    }
}
