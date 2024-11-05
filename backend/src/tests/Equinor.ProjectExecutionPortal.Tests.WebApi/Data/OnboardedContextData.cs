using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Data;

internal static class OnboardedContextData
{
    public static class InitialDbSeedData
    {
        public static readonly OnboardedContext JcaContext = new(FusionContextApiData.JcaContextExternalId, ContextTypeData.ValidContextTypes.ProjectMasterContextTypeKey, "desc");
        public static readonly OnboardedContext OgpContext = new(FusionContextApiData.OgpContextExternalId, ContextTypeData.ValidContextTypes.ProjectMasterContextTypeKey, "desc");
    }
}