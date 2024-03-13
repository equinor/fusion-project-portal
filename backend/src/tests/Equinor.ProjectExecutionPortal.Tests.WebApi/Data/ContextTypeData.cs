using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Data
{
    internal class ContextTypeData
    {
        public class InitialSeedData
        {
            public static ContextType ContextType1 = new("ProjectMaster");
            public static ContextType ContextType2 = new("Facility");
        }
    }
}
