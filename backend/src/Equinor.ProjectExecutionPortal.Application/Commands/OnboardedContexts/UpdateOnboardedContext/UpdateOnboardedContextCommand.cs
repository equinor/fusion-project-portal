using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.OnboardedContexts.UpdateOnboardedContext;

public class UpdateOnboardedContextCommand : IRequest<string>
{
    public UpdateOnboardedContextCommand(string externalId, string? description)
    {
        ExternalId = externalId;
        Description = description;
    }

    public string ExternalId { get; }
    public string? Description { get; set; }

    public class Handler : IRequestHandler<UpdateOnboardedContextCommand, string>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task<string> Handle(UpdateOnboardedContextCommand command, CancellationToken cancellationToken)
        {
            var entity = await _readWriteContext.Set<OnboardedContext>()
                .FirstOrDefaultAsync(x => x.ExternalId == command.ExternalId, cancellationToken);

            if (entity == null)
            {
                throw new NotFoundException(nameof(OnboardedContext), command.ExternalId);
            }

            entity.Update(command.Description);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return entity.ExternalId;
        }
    }
}
