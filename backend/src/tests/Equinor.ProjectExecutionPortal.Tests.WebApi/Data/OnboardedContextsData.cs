using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Data
{
    internal class OnboardedContextsData
    {
        public class InitialSeedData
        {
            public static OnboardedContext JcaContext = new("FC5FFCBC-392F-4D7E-BB14-79A006579337", "type", "title", "desc");
        }
    }
}
