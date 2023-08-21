using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.OnboardedApps.RemoveOnboardedApp;

public class RemoveOnboardedAppCommand : IRequest
{
    public RemoveOnboardedAppCommand(string appKey)
    {
        AppKey = appKey;
    }

    public string AppKey { get; }

    public class Handler : IRequestHandler<RemoveOnboardedAppCommand>
    {
        private readonly IReadWriteContext _context;

        public Handler(IReadWriteContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(RemoveOnboardedAppCommand command, CancellationToken cancellationToken)
        {
            var entity = await _context.Set<OnboardedApp>()
                .FirstOrDefaultAsync(onboardedApp => onboardedApp.AppKey == command.AppKey, cancellationToken);

            if (entity == null)
            {
                throw new NotFoundException(nameof(OnboardedApp), command.AppKey);
            }

            _context.Set<OnboardedApp>().Remove(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
