namespace Equinor.ProjectExecutionPortal.Domain.Interfaces;

public interface IContextSetter
{
    void SetContext(string externalId, string type);

    void SetCrossContextQuery();

    void ClearCrossContextQuery();
}
