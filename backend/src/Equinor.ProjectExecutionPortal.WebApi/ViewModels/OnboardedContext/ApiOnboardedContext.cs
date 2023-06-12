using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedContexts;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedContext
{
    public class ApiOnboardedContext
    {
        public ApiOnboardedContext()
        {
        }

        public ApiOnboardedContext(OnboardedContextDto onboardedAppDto)
        {
            Id = onboardedAppDto.Id;
            ExternalId = onboardedAppDto.ExternalId;
            Type = onboardedAppDto.Type;
            Description = onboardedAppDto.Description;
        }

        public Guid Id { get; set; }
        public string ExternalId { get; set; }
        public string Type { get; set; }
        public string? Description { get; set; }
    }
}
