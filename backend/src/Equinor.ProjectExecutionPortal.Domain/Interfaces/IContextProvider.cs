namespace Equinor.ProjectExecutionPortal.Domain.Interfaces;

public interface IContextProvider
{
    string ExternalId { get; }

    string Type { get; }

    bool IsCrossContextQuery { get; }
}
