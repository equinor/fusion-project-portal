using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.OnboardedContexts.OnboardContext;

public class OnboardContextCommand : IRequest<string>
{
    public OnboardContextCommand(string externalId, string type, string? description)
    {
        ExternalId = externalId;
        Type = type;
        Description = description;
    }

    public string ExternalId { get; }
    public string Type { get; }
    public string? Description { get; }

    public class Handler : IRequestHandler<OnboardContextCommand, string>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task<string> Handle(OnboardContextCommand command, CancellationToken cancellationToken)
        {
            var onboardedContextExists = await _readWriteContext.Set<OnboardedContext>()
                .AsNoTracking()
                .AnyAsync(x => x.ExternalId == command.ExternalId, cancellationToken);

            if (onboardedContextExists)
            {
                throw new InvalidActionException($"Context: '{command.ExternalId}' is already onboarded");
            }

            var onboardedContext = new OnboardedContext(command.ExternalId, command.Type, null, command.Description);

            await _readWriteContext.Set<OnboardedContext>().AddAsync(onboardedContext, cancellationToken);
            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return onboardedContext.ExternalId;
        }
    }
}
