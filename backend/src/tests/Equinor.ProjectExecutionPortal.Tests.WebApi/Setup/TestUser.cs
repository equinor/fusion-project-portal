﻿namespace Equinor.ProjectExecutionPortal.Tests.WebApi.Setup;

public class TestUser : ITestUser
{
    public TokenProfile? Profile { get; set; }
    public HttpClient HttpClient { get; set; } = null!;

    public override string? ToString() => Profile?.ToString();
}