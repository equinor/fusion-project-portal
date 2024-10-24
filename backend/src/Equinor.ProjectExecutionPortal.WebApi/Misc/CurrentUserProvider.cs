using Equinor.ProjectExecutionPortal.Domain.Interfaces;

namespace Equinor.ProjectExecutionPortal.WebApi.Misc;

public class CurrentUserProvider : ICurrentUserProvider, ICurrentUserSetter
{
    private Guid? _currentUserOid;

    public Guid GetCurrentUserOid()
    {
        if (_currentUserOid.HasValue)
        {
            return _currentUserOid.Value;
        }

        throw new Exception("Unable to determine current user");
    }

    public void SetCurrentUserOid(Guid oid) => _currentUserOid = oid;
}
