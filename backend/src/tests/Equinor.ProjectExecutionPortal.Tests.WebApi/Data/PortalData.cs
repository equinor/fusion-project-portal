using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Data
{
    internal class PortalData
    {
        public class InitialSeedData
        {
            public static Portal Portal = new ("Test Portal", "A kewl portal description");
        }
    }
}
