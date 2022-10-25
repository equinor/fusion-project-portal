namespace Equinor.ProjectExecutionPortal.Domain.Interfaces;

public interface IContextProvider
{
    Guid ExternalId { get; }

    string Type { get; }

    bool IsCrossContextQuery { get; }
}
