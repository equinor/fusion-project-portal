﻿using Fusion.Integration;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers;

[ApiController]
public abstract class ApiControllerBase : Controller
{
    private IAuthorizationService _authorizationService = null!;
    private IFusionContextResolver _contextResolver = null!;
    private ISender _mediator = null!;

    protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<ISender>();
    protected IFusionContextResolver ContextResolver => _contextResolver ??= HttpContext.RequestServices.GetRequiredService<IFusionContextResolver>();
    protected IAuthorizationService AuthorizationService => _authorizationService ??= HttpContext.RequestServices.GetRequiredService<IAuthorizationService>();

    protected static ActionResult CreateForbiddenResponse()
    {
        return FusionApiError.Forbidden("User is not authorized");
    }

    private protected async Task SetAuthorizedVerbsHeader(List<(string verb, string policy)> verbPolicyMap, object? resource)
    {
        var allowedVerbs = await GetAuthorizedVerbs(verbPolicyMap, resource);
        HttpContext.Response.Headers.Append("Allow", string.Join(',', allowedVerbs));
    }

    private async Task<List<string>> GetAuthorizedVerbs(List<(string verb, string policy)> verbPolicyMap, object? resource)
    {
        var allowedVerbs = new List<string> { HttpMethod.Options.Method }; // Always allowed

        foreach (var (verb, policy) in verbPolicyMap)
        {
            var authResult = await AuthorizationService.AuthorizeAsync(User, resource, policy);

            if (authResult.Succeeded)
            {
                allowedVerbs.Add(verb);
            }
        }

        return allowedVerbs;
    }
}
