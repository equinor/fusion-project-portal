using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Data
{
    internal class ContextTypeData
    {
        public class InitialDbSeedData
        {
            public static ContextType ContextType1 = new(ValidContextTypes.ProjectMasterContextTypeKey);
            public static ContextType ContextType2 = new(ValidContextTypes.FacilityContextTypeKey);
        }

        public class ValidContextTypes
        {
            public static string ProjectMasterContextTypeKey = "ProjectMaster";
            public static string FacilityContextTypeKey = "Facility";
            public static string ContractContextTypeKey = "Contract";
        }

        public class InvalidContextTypes
        {
            public static string InvalidContextTypeKey = "SuperContext";
        }
    }
}
