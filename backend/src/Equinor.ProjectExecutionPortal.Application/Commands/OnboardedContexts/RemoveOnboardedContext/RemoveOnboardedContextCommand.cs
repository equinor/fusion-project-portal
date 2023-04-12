using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.OnboardedContexts.RemoveOnboardedContext;

public class RemoveOnboardedContextCommand : IRequest
{
    public RemoveOnboardedContextCommand(string externalId)
    {
        ExternalId = externalId;
    }

    public string ExternalId { get; }

    public class Handler : IRequestHandler<RemoveOnboardedContextCommand>
    {
        private readonly IReadWriteContext _context;

        public Handler(IReadWriteContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(RemoveOnboardedContextCommand command, CancellationToken cancellationToken)
        {
            var entity = await _context.Set<OnboardedContext>()
                .Include(x => x.Apps)
                .SingleOrDefaultAsync(onboardedContext => onboardedContext.ExternalId == command.ExternalId, cancellationToken);

            if (entity == null)
            {
                throw new NotFoundException(nameof(OnboardedContext), command.ExternalId);
            }

            if (entity.Apps.Any())
            {
                throw new InvalidActionException("Cannot remove onboarded context. Context have onboarded apps.");
            }

            _context.Set<OnboardedContext>().Remove(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
