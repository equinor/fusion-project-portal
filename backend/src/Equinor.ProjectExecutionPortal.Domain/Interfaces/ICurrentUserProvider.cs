namespace Equinor.ProjectExecutionPortal.Domain.Interfaces;

public interface ICurrentUserProvider
{
    Guid GetCurrentUserOid();

    bool HasCurrentUser();
}
