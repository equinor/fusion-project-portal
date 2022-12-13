using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Data
{
    internal class WorkSurfaceAppGroupData
    {
        public class InitialSeedData
        {
            public static WorkSurfaceAppGroup AppGroup1 = new("App group with global apps only", 0, "#E24973");
            public static WorkSurfaceAppGroup AppGroup2 = new("App group with context apps only", 1, "#6D2FD5");
            public static WorkSurfaceAppGroup AppGroup3 = new("App group with mixed apps", 2, "#0084C4");
        }
    }
}
