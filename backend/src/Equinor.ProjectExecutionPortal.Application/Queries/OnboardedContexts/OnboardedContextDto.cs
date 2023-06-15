﻿using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;
using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Application.Queries.OnboardedContexts;

public class OnboardedContextDto : IMapFrom<OnboardedContext>
{
    public Guid Id { get; set; }
    public string ExternalId { get; set; }
    public string Type { get; set; }
    public string? Description { get; set; }
}