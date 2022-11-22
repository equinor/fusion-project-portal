namespace Equinor.ProjectExecutionPortal.Domain.Interfaces;

public interface IAuthenticator
{
    AuthenticationType AuthenticationType { get; set; }
}
