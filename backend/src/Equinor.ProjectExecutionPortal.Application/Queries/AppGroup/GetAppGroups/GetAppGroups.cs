using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaceAppGroup;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.AppGroup.GetAppGroups;

public class GetAppGroups : QueryBase<IList<AppGroupDto>>
{
    public GetAppGroups()
    {
    }
    
    public class Handler : IRequestHandler<GetAppGroups, IList<AppGroupDto>>
    {
        private readonly IReadWriteContext _readWriteContext;
        private readonly IMapper _mapper;

        public Handler(IReadWriteContext readWriteContext, IMapper mapper)
        {
            _readWriteContext = readWriteContext;
            _mapper = mapper;
        }

        public async Task<IList<AppGroupDto>> Handle(GetAppGroups request, CancellationToken cancellationToken)
        {
            var entities = await _readWriteContext.Set<Domain.Entities.AppGroup>()
                .AsNoTracking()
                .OrderBy(x => x.Order)
                .ToListAsync(cancellationToken);

            var appGroups = _mapper.Map<List<Domain.Entities.AppGroup>, List<AppGroupDto>>(entities.ToList());

            return appGroups;
        }
    }
}
