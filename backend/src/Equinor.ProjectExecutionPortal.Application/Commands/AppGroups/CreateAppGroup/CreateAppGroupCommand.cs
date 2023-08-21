using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.AppGroups.CreateAppGroup;

public class CreateAppGroupCommand : IRequest<Guid>
{
    public CreateAppGroupCommand(string name, string accentColor)
    {
        Name = name;
        AccentColor = accentColor;
    }

    public string Name { get; set; }
    public string AccentColor { get; set; }

    public class Handler : IRequestHandler<CreateAppGroupCommand, Guid>
    {
        private readonly IReadWriteContext _readWriteContext;

        public Handler(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }

        public async Task<Guid> Handle(CreateAppGroupCommand command, CancellationToken cancellationToken)
        {
            var appGroupsCount = await _readWriteContext.Set<AppGroup>().CountAsync(cancellationToken);
            var appGroup = new AppGroup(command.Name, appGroupsCount, command.AccentColor);

            await _readWriteContext.Set<AppGroup>().AddAsync(appGroup, cancellationToken);
            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return appGroup.Id;
        }
    }
}
