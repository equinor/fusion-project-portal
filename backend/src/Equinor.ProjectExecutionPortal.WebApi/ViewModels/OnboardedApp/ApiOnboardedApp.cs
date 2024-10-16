﻿using Equinor.ProjectExecutionPortal.Application.Queries.OnboardedApps;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.ContextType;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedApp
{
    public class ApiOnboardedApp
    {
        public ApiOnboardedApp()
        { }

        public ApiOnboardedApp(OnboardedAppDto onboardedAppDto)
        {
            Id = onboardedAppDto.Id;
            AppKey = onboardedAppDto.AppKey;
            Name = onboardedAppDto.AppInformation?.Name;
            Description = onboardedAppDto.AppInformation?.Description;
            Contexts = onboardedAppDto.ContextTypes.Select(x => new ApiContextType(x)).ToList();
            ContextTypes = onboardedAppDto.ContextTypes.Select(x => x.ContextTypeKey).ToList();
            AppInformation = onboardedAppDto.AppInformation != null ? new ApiFusionPortalAppInformation(onboardedAppDto.AppInformation) : null;
        }

        public Guid Id { get; set; }
        public string AppKey { get; set; } = null!;
        public string? Name { get; set; }
        public string? Description { get; set; }
        public IList<ApiContextType> Contexts { get; set; }
        public IList<string> ContextTypes { get; set; }
        public ApiFusionPortalAppInformation? AppInformation { get; set; }
    }
}
