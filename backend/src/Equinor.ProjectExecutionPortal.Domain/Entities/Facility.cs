namespace Equinor.ProjectExecutionPortal.Infrastructure.Entities;

public class Facility
{
    // Refer to Fusion Context

    public Facility(string commonLibFacility, string proCoSysPlantId, int proCoSysProjectId, string proCoSysProjectName)
    {
        CommonLibFacility = commonLibFacility;
        ProCoSysPlantId = proCoSysPlantId;
        ProCoSysProjectId = proCoSysProjectId;
        ProCoSysProjectName = proCoSysProjectName;
    }

    public string CommonLibFacility { get; }
    public string ProCoSysPlantId { get; }
    public int ProCoSysProjectId { get; }
    public string ProCoSysProjectName { get; }
}
