using Equinor.ProjectExecutionPortal.Application.Services.ContextTypeService;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.Portals.AddContextTypeToPortal
{
    public class AddContextTypeToPortalCommand : IRequest<Unit>
    {
        public AddContextTypeToPortalCommand(Guid workSurfaceId, string type)
        {
            WorkSurfaceId = workSurfaceId;
            Type = type;
        }

        public Guid WorkSurfaceId { get; }
        public string Type { get; }
    }

    public class Handler : IRequestHandler<AddContextTypeToPortalCommand, Unit>
    {
        private readonly IReadWriteContext _readWriteContext;
        private readonly IContextTypeService _contextTypeService;

        public Handler(IReadWriteContext readWriteContext, IContextTypeService contextTypeService)
        {
            _readWriteContext = readWriteContext;
            _contextTypeService = contextTypeService;
        }

        public async Task<Unit> Handle(AddContextTypeToPortalCommand command, CancellationToken cancellationToken)
        {
            var workSurfaceWithAllContextTypes = await _readWriteContext.Set<Portal>()
                .Include(x => x.ContextTypes)
                .FirstOrDefaultAsync(x => x.Id == command.WorkSurfaceId, cancellationToken);

            if (workSurfaceWithAllContextTypes == null)
            {
                throw new NotFoundException(nameof(Portal), command.WorkSurfaceId);
            }

            var contextTypeExistsOnWorkSurface = workSurfaceWithAllContextTypes.ContextTypes.Where(x => x.ContextTypeKey == command.Type);

            if (contextTypeExistsOnWorkSurface.Any())
            {
                throw new InvalidActionException($"context-type {command.Type}is already enabled on portal");
            }

            var contextType = await _readWriteContext.Set<ContextType>()
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.ContextTypeKey == command.Type, cancellationToken);

            if (contextType == null)
            {
                throw new InvalidActionException($"context-type: {command.Type} is not supported");
            }

            workSurfaceWithAllContextTypes.AddContextType(contextType);

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
