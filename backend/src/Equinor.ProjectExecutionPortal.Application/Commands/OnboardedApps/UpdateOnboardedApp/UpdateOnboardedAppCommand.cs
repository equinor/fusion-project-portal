using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.OnboardedApps.UpdateOnboardedApp;

public class UpdateOnboardedAppCommand : IRequest<Guid>
{
    public UpdateOnboardedAppCommand(string appKey, Guid appGroupId)
    {
        AppKey = appKey;
        AppGroupId = appGroupId;
    }

    public string AppKey { get; }
    public Guid AppGroupId { get; }

    public class Handler : IRequestHandler<UpdateOnboardedAppCommand, Guid>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task<Guid> Handle(UpdateOnboardedAppCommand command, CancellationToken cancellationToken)
        {
            var entity = await _readWriteContext.Set<OnboardedApp>()
                .FirstOrDefaultAsync(x => x.AppKey == command.AppKey, cancellationToken);

            if (entity == null)
            {
                throw new NotFoundException(nameof(OnboardedApp), command.AppKey);
            }

            entity.Update(command.AppGroupId);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}
