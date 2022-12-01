using AutoMapper;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaceAppGroup.GetAppGroupsForWorkSurface;

public class GetAppGroupsForWorkSurfaceQuery : QueryBase<IList<WorkSurfaceAppGroupDto>?>
{
    public GetAppGroupsForWorkSurfaceQuery(Guid workSurfaceId)
    {
        WorkSurfaceId = workSurfaceId;
    }

    public Guid WorkSurfaceId { get; }

    public class Handler : IRequestHandler<GetAppGroupsForWorkSurfaceQuery, IList<WorkSurfaceAppGroupDto>?>
    {
        private readonly IReadWriteContext _readWriteContext;
        private readonly IMapper _mapper;

        public Handler(IReadWriteContext readWriteContext, IMapper mapper)
        {
            _readWriteContext = readWriteContext;
            _mapper = mapper;
        }

        public async Task<IList<WorkSurfaceAppGroupDto>?> Handle(GetAppGroupsForWorkSurfaceQuery request, CancellationToken cancellationToken)
        {
            var workSurface = await _readWriteContext.Set<Domain.Entities.WorkSurface>()
                .AsNoTracking()
                .Include(x => x.AppGroups.OrderBy(x => x.Order))
                .FirstOrDefaultAsync(x => x.Id == request.WorkSurfaceId, cancellationToken) ?? throw new NotFoundException();

            var appGroups = _mapper.Map<List<Domain.Entities.WorkSurfaceAppGroup>, List<WorkSurfaceAppGroupDto>>(workSurface.AppGroups.ToList());

            return appGroups;
        }
    }
}
