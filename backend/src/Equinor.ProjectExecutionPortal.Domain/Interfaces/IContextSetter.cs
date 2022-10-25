namespace Equinor.ProjectExecutionPortal.Domain.Interfaces;

public interface IContextSetter
{
    void SetContext(Guid externalId, string type);

    void SetCrossContextQuery();

    void ClearCrossContextQuery();
}
