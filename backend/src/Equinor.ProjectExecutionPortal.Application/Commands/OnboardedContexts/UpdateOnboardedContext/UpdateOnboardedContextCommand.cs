using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.OnboardedContexts.UpdateOnboardedContext;

public class UpdateOnboardedContextCommand : IRequest<string>
{
    public UpdateOnboardedContextCommand(Guid id, string? description)
    {
        Id = id;
        Description = description;
    }

    public Guid Id { get; }
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
                .FirstOrDefaultAsync(x => x.Id == command.Id, cancellationToken);

            if (entity == null)
            {
                throw new NotFoundException(nameof(OnboardedContext), command.Id);
            }

            entity.Update(command.Description);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return entity.ExternalId;
        }
    }
}
