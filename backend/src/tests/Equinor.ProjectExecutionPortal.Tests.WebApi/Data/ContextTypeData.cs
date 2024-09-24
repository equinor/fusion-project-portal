using Equinor.ProjectExecutionPortal.Domain.Entities;
using Fusion.Integration;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Data
{
    internal class ContextTypeData
    {
        public class InitialSeedData
        {
            public static ContextType ContextType1 = new(ValidData.ProjectMasterContextTypeKey);
            public static ContextType ContextType2 = new(ValidData.FacilityContextTypeKey);
        }

        public class ValidData
        {
            public static string ProjectMasterContextTypeKey = "ProjectMaster";
            public static string FacilityContextTypeKey = "Facility";
            public static string ContractContextTypeKey = "Contract";
        }

        public class InvalidData
        {
            public static string InvalidContextTypeKey = "SuperContext";
        }
    }
}
