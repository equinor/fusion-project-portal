using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Data
{
    internal static class ContextTypeData
    {
        public static class InitialDbSeedData
        {
            public static readonly ContextType ContextType1 = new(ValidContextTypes.ProjectMasterContextTypeKey);
            public static readonly ContextType ContextType2 = new(ValidContextTypes.FacilityContextTypeKey);
        }

        public static class ValidContextTypes
        {
            public const string ProjectMasterContextTypeKey = "ProjectMaster";
            public const string FacilityContextTypeKey = "Facility";
            public const string ContractContextTypeKey = "Contract";
        }

        public static class InvalidContextTypes
        {
            public const string InvalidContextTypeKey = "SuperContext";
        }
    }
}
