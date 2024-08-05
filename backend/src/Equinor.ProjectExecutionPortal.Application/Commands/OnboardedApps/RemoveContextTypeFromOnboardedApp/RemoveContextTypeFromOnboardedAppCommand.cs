using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.OnboardedApps.RemoveContextTypeFromOnboardedApp;

public class RemoveContextTypeFromFromOnboardedAppCommand : IRequest
{
    public RemoveContextTypeFromFromOnboardedAppCommand(string appKey, string contextType)
    {
        AppKey = appKey;
        ContextType = contextType;
    }

    public string AppKey { get; }
    public string ContextType { get; }

    public class Handler : IRequestHandler<RemoveContextTypeFromFromOnboardedAppCommand>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task Handle(RemoveContextTypeFromFromOnboardedAppCommand command, CancellationToken cancellationToken)
        {
            var onboardedAppWithAllContextTypes = await _readWriteContext.Set<OnboardedApp>()
                .Include(x => x.ContextTypes)
                .FirstOrDefaultAsync(x => x.AppKey == command.AppKey, cancellationToken);

            if (onboardedAppWithAllContextTypes == null)
            {
                throw new NotFoundException(nameof(Portal), command.AppKey);
            }

            var contextTypeToRemove = onboardedAppWithAllContextTypes.ContextTypes.FirstOrDefault(x => x.ContextTypeKey.Equals(command.ContextType, StringComparison.InvariantCultureIgnoreCase));
            
            if (contextTypeToRemove == null)
            {
                throw new InvalidActionException($"Context-type: {command.ContextType} is not enabled on onboarded app ");
            }

            onboardedAppWithAllContextTypes.RemoveContextType(contextTypeToRemove);

            await _readWriteContext.SaveChangesAsync(cancellationToken);
        }
    }
}
