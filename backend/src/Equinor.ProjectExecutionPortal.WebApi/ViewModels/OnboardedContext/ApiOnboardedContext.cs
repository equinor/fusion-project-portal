namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedContext
{
    public class ApiOnboardedContext
    {
        public ApiOnboardedContext()
        {
        }

        public ApiOnboardedContext(OnboardedContextDto onboardedAppDto)
        {
            ExternalId = onboardedAppDto.ExternalId;
            Title = onboardedAppDto.Title;
            Description = onboardedAppDto.Description;
        }

        public string ExternalId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
    }
}
