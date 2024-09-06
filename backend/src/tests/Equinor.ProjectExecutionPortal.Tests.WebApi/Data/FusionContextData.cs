using Fusion.Integration;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Data
{
    internal class FusionContextData
    {
        public class InitialSeedData
        {
            public static string JcaContextExternalId = "fc5ffcbc-392f-4d7e-bb14-79a006579337";
            public static Guid JcaContextId = new Guid("94dd5f4d-17f1-4312-bf75-ad75f4d9572c");
            public static string OgpContextExternalId = "91dd6653-a364-40c7-af26-7af516d66c42";
            public static Guid OgpContextId = new Guid("ce31b83a-b6cd-4267-89f3-db308edf721e");
            public static string InvalidContextExternalId = "11111111-1111-1111-1111-111111111111";
            public static Guid InvalidContextId = new Guid("11111111-1111-1111-1111-111111111111");
            public static string ContextType = "ProjectMaster";
        }

        public static FusionContext JcaFusionContext => new()
        {
            Id = new Guid("94dd5f4d-17f1-4312-bf75-ad75f4d9572c"),
            IsActive = true,
            ExternalId = InitialSeedData.JcaContextExternalId,
            Title = "Johan Castberg",
            Type = FusionContextType.ProjectMaster,
            Value = null!,
            Source = null
        };

        public static FusionContext OgpFusionContext => new()
        {
            Id = new Guid("11115f4d-17f1-4312-bf75-ad75f4d9572c"),
            IsActive = true,
            ExternalId = InitialSeedData.OgpContextExternalId,
            Title = "Oseberg",
            Type = FusionContextType.ProjectMaster,
            Value = null!,
            Source = null
        };

        public static List<FusionContext> ValidFusionContexts => new()
        {
            JcaFusionContext, OgpFusionContext
        };
    }
}
