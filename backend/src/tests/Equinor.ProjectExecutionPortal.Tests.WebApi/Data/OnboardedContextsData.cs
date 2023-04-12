using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Data
{
    internal class OnboardedContextsData
    {
        public class InitialSeedData
        {
            public static OnboardedContext JcaContext = new("FC5FFCBC-392F-4D7E-BB14-79A006579337", "ProjectMaster", "title", "desc");
            public static OnboardedContext OgpContext = new("91dd6653-a364-40c7-af26-7af516d66c42", "ProjectMaster", "title", "desc");
        }
    }
}
