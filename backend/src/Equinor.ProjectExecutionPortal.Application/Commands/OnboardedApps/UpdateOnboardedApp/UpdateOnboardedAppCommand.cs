using Equinor.ProjectExecutionPortal.Application.Services.ContextTypeService;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.OnboardedApps.UpdateOnboardedApp;

public class UpdateOnboardedAppCommand(string appKey, IList<string>? contextTypes) : IRequest<Guid>
{
    public string AppKey { get; } = appKey;
    public IList<string>? ContextTypes { get; set; } = contextTypes;

    public class Handler(IReadWriteContext readWriteContext, IContextTypeService contextTypeService) : IRequestHandler<UpdateOnboardedAppCommand, Guid>
    {
        public async Task<Guid> Handle(UpdateOnboardedAppCommand command, CancellationToken cancellationToken)
        {
            var entity = await readWriteContext.Set<OnboardedApp>()
                .Include(x => x.ContextTypes)
                .FirstOrDefaultAsync(x => x.AppKey == command.AppKey, cancellationToken);

            if (entity is null)
            {
                throw new NotFoundException("App is not onboarded", command.AppKey);
            }

            try
            {
                entity.AddContextTypes(await contextTypeService.GetAllowedContextTypesByKeys(command.ContextTypes, cancellationToken));
            }
            catch (InvalidActionException ex)
            {
                throw new InvalidOperationException(ex.Message);
            }

            await readWriteContext.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}
