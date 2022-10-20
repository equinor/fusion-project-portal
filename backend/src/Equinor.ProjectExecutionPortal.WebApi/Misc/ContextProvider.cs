using Equinor.ProjectExecutionPortal.Domain.Interfaces;

namespace Equinor.ProjectExecutionPortal.WebApi.Misc;

public class ContextProvider : IContextProvider, IContextSetter
{
    public Guid ContextId { get; private set; }
    public bool IsCrossContextQuery { get; private set; }

    public void SetContext(Guid contextId) => ContextId = contextId;
    public void SetCrossPlantQuery() => IsCrossContextQuery = true;
    public void ClearCrossPlantQuery() => IsCrossContextQuery = false;
}
