using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Data
{
    internal class OnboardedContextData
    {
        public class InitialDbSeedData
        {
            public static OnboardedContext JcaContext = new(FusionContextApiData.JcaContextExternalId, ContextTypeData.ValidContextTypes.ProjectMasterContextTypeKey, "desc");
            public static OnboardedContext OgpContext = new(FusionContextApiData.OgpContextExternalId, ContextTypeData.ValidContextTypes.ProjectMasterContextTypeKey, "desc");
        }
    }
}
