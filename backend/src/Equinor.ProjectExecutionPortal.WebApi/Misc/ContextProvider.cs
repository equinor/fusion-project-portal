using Equinor.ProjectExecutionPortal.Domain.Interfaces;

namespace Equinor.ProjectExecutionPortal.WebApi.Misc;

public class ContextProvider : IContextProvider, IContextSetter
{
    public string ExternalId { get; private set; }
    public string Type { get; private set; }
    public bool IsCrossContextQuery { get; private set; }

    public void SetContext(string externalId, string type)
    {
        ExternalId = externalId;
        Type = type;
    }

    public void SetCrossContextQuery() => IsCrossContextQuery = true;

    public void ClearCrossContextQuery() => IsCrossContextQuery = false;
}
