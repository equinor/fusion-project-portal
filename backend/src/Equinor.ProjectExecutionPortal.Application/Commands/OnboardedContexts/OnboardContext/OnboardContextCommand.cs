using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.OnboardedContexts.OnboardContext;

public class OnboardContextCommand : IRequest<string>
{
    public OnboardContextCommand(string externalId)
    {
        ExternalId = externalId;
    }

    public string ExternalId { get; }

    public class Handler : IRequestHandler<OnboardContextCommand, string>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task<string> Handle(OnboardContextCommand command, CancellationToken cancellationToken)
        {
            var existingOnboardedContext = await _readWriteContext.Set<OnboardedContext>()
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.ExternalId == command.ExternalId, cancellationToken);

            if (existingOnboardedContext != null)
            {
                throw new InvalidActionException($"Onboarded context: {command.ExternalId} is already onboarded");
            }

            // TODO: Resolve type
            var onboardedContext = new OnboardedContext(command.ExternalId, "type", null, null);

            await _readWriteContext.Set<OnboardedContext>().AddAsync(onboardedContext, cancellationToken);
            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return onboardedContext.ExternalId;
        }
    }
}
