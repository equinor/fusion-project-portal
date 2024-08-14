﻿using Equinor.ProjectExecutionPortal.Application.Helpers;
using Equinor.ProjectExecutionPortal.Application.Services.ContextTypeService;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Commands.Portals.UpdatePortal;

public class UpdatePortalCommand : IRequest<Guid>
{
    public UpdatePortalCommand(Guid id, string name, string shortName, string subText, string? description, int order, string icon, IList<string>? contextTypes)
    {
        Id = id;
        Name = name;
        ShortName = shortName;
        SubText = subText;
        Description = description;
        Order = order;
        Icon = icon;
        ContextTypes = contextTypes;
    }

    public Guid Id { get; }
    public string Name { get; }
    public string ShortName { get; }
    public string SubText { get; }
    public string? Description { get; set; }
    public int Order { get; }
    public string Icon { get; }
    public IList<string>? ContextTypes { get; set; }

    public class Handler : IRequestHandler<UpdatePortalCommand, Guid>
    {
        private readonly IReadWriteContext _readWriteContext;
        private readonly IContextTypeService _contextTypeService;

        public Handler(IReadWriteContext readWriteContext, IContextTypeService contextTypeService)
        {
            _readWriteContext = readWriteContext;
            _contextTypeService = contextTypeService;
        }

        public async Task<Guid> Handle(UpdatePortalCommand command, CancellationToken cancellationToken)
        {
            var entity = await _readWriteContext.Set<Portal>()
                .Include(x => x.ContextTypes)
                .FirstOrDefaultAsync(x => x.Id == command.Id, cancellationToken);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Portal), command.Id);
            }

            var slug = SlugHelper.Sluggify(command.Name);

            entity.Update(slug, command.Name, command.ShortName, command.SubText, command.Description, command.Order, command.Icon);

            entity.AddContextTypes(await _contextTypeService.GetContextTypesByContextTypeKey(command.ContextTypes, cancellationToken));

            await _readWriteContext.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}
