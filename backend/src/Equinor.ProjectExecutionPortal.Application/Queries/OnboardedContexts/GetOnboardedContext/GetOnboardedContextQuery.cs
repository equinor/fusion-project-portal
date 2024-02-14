﻿using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Services.ContextService;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.OnboardedContexts.GetOnboardedContext;

public class GetOnboardedContextQuery : QueryBase<OnboardedContextDto?>
{
    public GetOnboardedContextQuery(Guid id)
    {
        Id = id;
    }

    public Guid Id { get; }

    public class Handler : IRequestHandler<GetOnboardedContextQuery, OnboardedContextDto?>
    {
        private readonly IReadWriteContext _readWriteContext;
        private readonly IMapper _mapper;
        private readonly IContextService _contextService;

        public Handler(IReadWriteContext readWriteContext, IMapper mapper, IContextService contextService)
        {
            _readWriteContext = readWriteContext;
            _mapper = mapper;
            _contextService = contextService;
        }

        public async Task<OnboardedContextDto?> Handle(GetOnboardedContextQuery request, CancellationToken cancellationToken)
        {
            var entity = await _readWriteContext.Set<Domain.Entities.OnboardedContext>()
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            var onboardedContext = _mapper.Map<Domain.Entities.OnboardedContext?, OnboardedContextDto?>(entity);
            
            await _contextService.EnrichContextWithFusionContextData(onboardedContext, cancellationToken);

            return onboardedContext;
        }
    }
}
