namespace Equinor.ProjectExecutionPortal.WebApi.Authentication;

public class AuthenticatorOptions
{
    public string Instance { get; set; } = null!;
    public string ProjectPortalApiClientId { get; set; } = null!;
    public string ProjectPortalApiSecret { get; set; } = null!;
}
