namespace Equinor.ProjectExecutionPortal.Domain.Interfaces;

public interface IContextProvider
{
    Guid ContextId { get; }

    bool IsCrossContextQuery { get; }
}
