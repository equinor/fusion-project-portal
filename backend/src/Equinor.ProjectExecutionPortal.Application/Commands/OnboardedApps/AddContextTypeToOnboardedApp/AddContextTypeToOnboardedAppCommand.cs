using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.OnboardedApps.AddContextTypeToOnboardedApp
{
    public class AddContextTypeToOnboardedAppCommand : IRequest<Unit>
    {
        public AddContextTypeToOnboardedAppCommand(string appKey, string type)
        {
            AppKey = appKey;
            Type = type;
        }

        public string AppKey { get; }
        public string Type { get; }
    }

    public class Handler : IRequestHandler<AddContextTypeToOnboardedAppCommand, Unit>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task<Unit> Handle(AddContextTypeToOnboardedAppCommand command, CancellationToken cancellationToken)
        {
            var onboardedAppWithAllContextTypes = await _readWriteContext.Set<OnboardedApp>()
                .Include(x => x.ContextTypes)
                .FirstOrDefaultAsync(x => x.AppKey == command.AppKey, cancellationToken);

            if (onboardedAppWithAllContextTypes == null)
            {
                throw new NotFoundException(nameof(WorkSurface), command.AppKey);
            }

            var contextTypeExistsOnOnboardedApp = onboardedAppWithAllContextTypes.ContextTypes.Where(x => x.ContextTypeKey == command.Type);

            if (contextTypeExistsOnOnboardedApp.Any())
            {
                throw new InvalidActionException($"context-type {command.Type}is already enabled on onboarded app");
            }

            var contextType = await _readWriteContext.Set<ContextType>()
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.ContextTypeKey == command.Type, cancellationToken);

            if (contextType == null)
            {
                throw new InvalidActionException($"context-type: {command.Type} is not supported");
            }

            onboardedAppWithAllContextTypes.AddContextType(contextType);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
