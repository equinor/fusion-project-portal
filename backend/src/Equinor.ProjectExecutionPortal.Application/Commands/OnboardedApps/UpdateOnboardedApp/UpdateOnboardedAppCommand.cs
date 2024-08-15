using Equinor.ProjectExecutionPortal.Application.Services.ContextTypeService;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.OnboardedApps.UpdateOnboardedApp;

public class UpdateOnboardedAppCommand : IRequest<Guid>
{
    public UpdateOnboardedAppCommand(string appKey, bool isLegacy, IList<string>? contextTypes)
    {
        AppKey = appKey;
        IsLegacy = isLegacy;
        ContextTypes = contextTypes;
    }

    public string AppKey { get; }
    public bool IsLegacy { get; }
    public IList<string>? ContextTypes { get; set; }

    public class Handler : IRequestHandler<UpdateOnboardedAppCommand, Guid>
    {
        private readonly IReadWriteContext _readWriteContext;
        private readonly IContextTypeService _contextTypeService;

        public Handler(IReadWriteContext readWriteContext, IContextTypeService contextTypeService)
        {
            _readWriteContext = readWriteContext;
            _contextTypeService = contextTypeService;
        }

        public async Task<Guid> Handle(UpdateOnboardedAppCommand command, CancellationToken cancellationToken)
        {
            var entity = await _readWriteContext.Set<OnboardedApp>()
                .Include(x => x.ContextTypes)
                .FirstOrDefaultAsync(x => x.AppKey == command.AppKey, cancellationToken);

            if (entity == null)
            {
                throw new NotFoundException("App is not onboarded", command.AppKey);
            }

            entity.Update(command.IsLegacy);

            try
            {
                entity.AddContextTypes(await _contextTypeService.GetContextTypesByContextTypeKey(command.ContextTypes, cancellationToken));
            }
            catch (InvalidActionException ex)
            {
                throw new InvalidOperationException(ex.Message);
            }

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}
