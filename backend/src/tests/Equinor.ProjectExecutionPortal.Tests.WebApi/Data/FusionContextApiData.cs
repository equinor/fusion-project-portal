using Fusion.Integration;

namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Data
{
    internal class FusionContextApiData
    {
        public static string JcaContextExternalId = "fc5ffcbc-392f-4d7e-bb14-79a006579337";
        public static Guid JcaContextId = new("94dd5f4d-17f1-4312-bf75-ad75f4d9572c");
        public static string OgpContextExternalId = "91dd6653-a364-40c7-af26-7af516d66c42";
        public static Guid OgpContextId = new("ce31b83a-b6cd-4267-89f3-db308edf721e");
        public static string MongstadContextExternalId = "09206ca3-02ac-4c65-adbf-caa7b66364ea";
        public static Guid MongstadContextId = new("4CB78175-46CF-41A3-58DB-08DC74C80D40");
        public static Guid InvalidContextId = new("11111111-1111-1111-1111-111111111111");

        public static FusionContext JcaFusionContext => new()
        {
            Id = JcaContextId,
            IsActive = true,
            ExternalId = JcaContextExternalId,
            Title = "Johan Castberg",
            Type = FusionContextType.ProjectMaster,
            Value = null!,
            Source = null
        };

        public static FusionContext OgpFusionContext => new()
        {
            Id = OgpContextId,
            IsActive = true,
            ExternalId = OgpContextExternalId,
            Title = "Oseberg",
            Type = FusionContextType.ProjectMaster,
            Value = null!,
            Source = null
        };

        public static FusionContext MongstadFusionContext => new()
        {
            Id = MongstadContextId,
            IsActive = true,
            ExternalId = MongstadContextExternalId,
            Title = "Mongstad WWTP",
            Type = FusionContextType.ProjectMaster,
            Value = null!,
            Source = null
        };

        public static List<FusionContext> ValidFusionContexts => [JcaFusionContext, OgpFusionContext, MongstadFusionContext];
    }
}
