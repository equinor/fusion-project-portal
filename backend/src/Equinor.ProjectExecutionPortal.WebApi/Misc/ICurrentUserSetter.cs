namespace Equinor.ProjectExecutionPortal.WebApi.Misc;

public interface ICurrentUserSetter
{
    void SetCurrentUserOid(Guid oid);
}
