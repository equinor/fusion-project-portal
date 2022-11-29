using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

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
        private readonly IAppService _appService;

        public Handler(IReadWriteContext readWriteContext, IAppService appService)
        {
            _readWriteContext = readWriteContext;
            _appService = appService;
        }

        public async Task<Guid> Handle(OnboardAppCommand command, CancellationToken cancellationToken)
        {
            if (!await _appService.AppExist(command.AppKey, cancellationToken))
            {
                throw new NotFoundException($"{command.AppKey} does not exist.");
            }

            var existingOnboardedApp = await _readWriteContext.Set<OnboardedApp>()
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.AppKey == command.AppKey, cancellationToken);

            if (existingOnboardedApp != null)
            {
                throw new InvalidActionException($"Onboarded app: {command.AppKey} is already onboarded");
            }

            var onboardedApp = new OnboardedApp(command.AppKey);

            await _readWriteContext.Set<OnboardedApp>().AddAsync(onboardedApp, cancellationToken);
            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return onboardedApp.Id;
        }
    }
}
