using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using Fusion.Integration;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.ContextTypes.AddContextType;

public class AddContextTypeCommand : IRequest<Guid>
{
    public AddContextTypeCommand(string contextTypeKey)
    {
        ContextTypeKey = contextTypeKey;
    }

    public string ContextTypeKey { get; }

    public class Handler : IRequestHandler<AddContextTypeCommand, Guid>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task<Guid> Handle(AddContextTypeCommand command, CancellationToken cancellationToken)
        {
            var contextTypeExists = await _readWriteContext.Set<ContextType>()
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

            _readWriteContext.Set<ContextType>().Add(contextType);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return contextType.Id;
        }
    }
}