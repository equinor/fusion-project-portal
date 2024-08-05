using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.ContextTypes.RemoveContextType;

public class RemoveContextTypeCommand : IRequest
{
    public RemoveContextTypeCommand(string contextTypeKey)
    {
        ContextTypeKey = contextTypeKey;
    }

    public string ContextTypeKey { get; }
   
    public class Handler : IRequestHandler<RemoveContextTypeCommand>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task Handle(RemoveContextTypeCommand command, CancellationToken cancellationToken)
        {
            var entity  = await _readWriteContext.Set<ContextType>()
                .Include(x => x.OnboardedApps)
                .Include(x => x.Portals)
                .FirstOrDefaultAsync(x => x.ContextTypeKey == command.ContextTypeKey, cancellationToken);

            if (entity == null)
            {
                throw new NotFoundException(nameof(ContextType) ,command.ContextTypeKey);
            }

            if (entity.Portals.Any())
            {
                 throw new InvalidActionException("Cannot remove context type. Context type is used by portals");
            }

            if (entity.OnboardedApps.Any())
            {
                throw new InvalidActionException("Cannot remove context type. Context type is used by onboarded apps");
            }

            _readWriteContext.Set<ContextType>().Remove(entity);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

        }
    }
}
