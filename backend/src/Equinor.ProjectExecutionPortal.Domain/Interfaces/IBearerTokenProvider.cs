namespace Equinor.ProjectExecutionPortal.Domain.Interfaces;

public interface IBearerTokenProvider
{
    ValueTask<string> GetBearerTokenAsync(string scope);
}
