namespace Equinor.ProjectExecutionPortal.Domain.Interfaces;

public interface IContextSetter
{
    void SetContext(Guid plant);
    void SetCrossPlantQuery();
    void ClearCrossPlantQuery();
}
