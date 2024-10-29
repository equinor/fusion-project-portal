using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using Fusion.Integration;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.ContextTypes.AddContextType;

public class AddContextTypeCommand(string contextTypeKey) : IRequest<Guid>
{
    public string ContextTypeKey { get; } = contextTypeKey;

    public class Handler(IReadWriteContext readWriteContext) : IRequestHandler<AddContextTypeCommand, Guid>
    {
        public async Task<Guid> Handle(AddContextTypeCommand command, CancellationToken cancellationToken)
        {
            var contextTypeExists = await readWriteContext.Set<ContextType>()
                .AsNoTracking()
                .AnyAsync(x => x.ContextTypeKey == command.ContextTypeKey, cancellationToken);

            if (contextTypeExists)
            {
                throw new InvalidActionException($"ContextType: {command.ContextTypeKey} is already supported");
            }

            if (!FusionContextType.IsValid(command.ContextTypeKey))
            {
                throw new NotFoundException($"ContextType: {command.ContextTypeKey} is not a valid Context type");
            }  

            var contextType = new ContextType(command.ContextTypeKey);

            readWriteContext.Set<ContextType>().Add(contextType);

            await readWriteContext.SaveChangesAsync(cancellationToken);

            return contextType.Id;
        }
    }
}
