using AutoMapper;
using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Portals.GetPortalConfiguration;

public class GetPortalConfigurationQuery : QueryBase<PortalConfigurationDto?>
{
    public GetPortalConfigurationQuery(Guid portalId)
    {
        PortalId = portalId;
    }

    public Guid PortalId { get; }

    public class Handler : IRequestHandler<GetPortalConfigurationQuery, PortalConfigurationDto?>
    {
        private readonly IReadWriteContext _readWriteContext;
        private readonly IMapper _mapper;

        public Handler(IReadWriteContext readWriteContext, IMapper mapper)
        {
            _readWriteContext = readWriteContext;
            _mapper = mapper;
        }

        public async Task<PortalConfigurationDto?> Handle(GetPortalConfigurationQuery request, CancellationToken cancellationToken)
        {
            var entity = await _readWriteContext.Set<PortalConfiguration>()
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.PortalId == request.PortalId, cancellationToken);

            var portalConfiguration = _mapper.Map<PortalConfiguration?, PortalConfigurationDto?>(entity);

            return portalConfiguration;
        }
    }
}
