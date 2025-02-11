﻿using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;
using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApps;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Portals;

public class PortalAppDto : IMapFrom<Domain.Entities.PortalApp>
{
    public required OnboardedAppDto OnboardedApp { get; set; }
}