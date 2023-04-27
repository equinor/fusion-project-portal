using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Data
{
    internal class OnboardedContextsData
    {
        public class InitialSeedData
        {
            public static OnboardedContext JcaContext = new(FusionContextData.InitialSeedData.JcaContextExternalId, FusionContextData.InitialSeedData.ContextType, "title", "desc");
            public static OnboardedContext OgpContext = new(FusionContextData.InitialSeedData.OgpContextExternalId, FusionContextData.InitialSeedData.ContextType, "title", "desc");
        }
    }
}
