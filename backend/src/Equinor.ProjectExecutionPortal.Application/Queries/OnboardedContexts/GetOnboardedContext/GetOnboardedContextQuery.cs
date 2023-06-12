using AutoMapper;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.OnboardedContexts.GetOnboardedContext;

public class GetOnboardedContextQuery : QueryBase<OnboardedContextDto?>
{
    public GetOnboardedContextQuery(string externalId)
    {
        ExternalId = externalId;
    }

    public string ExternalId { get; }

    public class Handler : IRequestHandler<GetOnboardedContextQuery, OnboardedContextDto?>
    {
        private readonly IReadWriteContext _readWriteContext;
        private readonly IMapper _mapper;

        public Handler(IReadWriteContext readWriteContext, IMapper mapper)
        {
            _readWriteContext = readWriteContext;
            _mapper = mapper;
        }

        public async Task<OnboardedContextDto?> Handle(GetOnboardedContextQuery request, CancellationToken cancellationToken)
        {
            var entity = await _readWriteContext.Set<Domain.Entities.OnboardedContext>()
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.ExternalId == request.ExternalId, cancellationToken)
                ?? throw new NotFoundException(nameof(Domain.Entities.OnboardedContext), request.ExternalId);

            return _mapper.Map<Domain.Entities.OnboardedContext, OnboardedContextDto>(entity);
        }
    }
}
