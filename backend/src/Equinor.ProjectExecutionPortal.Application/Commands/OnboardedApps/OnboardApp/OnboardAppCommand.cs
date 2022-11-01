using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;

namespace Equinor.ProjectExecutionPortal.Application.Commands.OnboardedApps.OnboardApp;

public class OnboardAppCommand : IRequest<Guid>
{
    public OnboardAppCommand(string appKey)
    {
        AppKey = appKey;
    }

    public string AppKey { get; }

    public class Handler : IRequestHandler<OnboardAppCommand, Guid>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task<Guid> Handle(OnboardAppCommand command, CancellationToken cancellationToken)
        {
            // TODO: Validate against Fusion Portal

            var onboardedApp = new OnboardedApp(command.AppKey);

            await _readWriteContext.Set<OnboardedApp>().AddAsync(onboardedApp, cancellationToken);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return onboardedApp.Id;
        }
    }
}
