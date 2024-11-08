using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedContexts;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedContext;

public class ApiOnboardedContext
{
#pragma warning disable CS8618 // For integration tests only
    public ApiOnboardedContext() { }
#pragma warning restore CS8618 // For integration tests only

    public ApiOnboardedContext(OnboardedContextDto onboardedAppDto)
    {
        Id = onboardedAppDto.Id;
        ExternalId = onboardedAppDto.ExternalId;
        Type = onboardedAppDto.Type;
        ContextId = onboardedAppDto.ContextId;
        Description = onboardedAppDto.Description;
        Title = onboardedAppDto.Title;
    }

    public Guid Id { get; set; }
    public string ExternalId { get; set; } = null!;
    public string Type { get; set; } = null!;
    public Guid ContextId { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
}