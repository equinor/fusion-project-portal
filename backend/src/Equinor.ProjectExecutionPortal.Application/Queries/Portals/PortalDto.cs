﻿using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;
using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaces;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Portals;

public class PortalDto : IMapFrom<Domain.Entities.Portal>
{
    public string Name { get; set; }
    public string Description { get; set; }
    public List<WorkSurfaceDto> WorkSurfaces { get; set; }
}