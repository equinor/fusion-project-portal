namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Setup
{
    public interface ITestUser
    {
        TokenProfile? Profile { get; set; }
        HttpClient HttpClient { get; set; }
    }
}
