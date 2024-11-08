using AutoMapper;
using Fusion.Integration;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers;

[ApiController]
public abstract class ApiControllerBase : Controller
{
    private ISender _mediator = null!;
    private IMapper _mapper = null!;
    private readonly ILogger<ApiControllerBase> _logger = null!;
    private IAuthorizationService _authorizationService = null!;
    private IFusionContextResolver _contextResolver = null!;

    protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<ISender>();
    protected IMapper Mapper => _mapper ??= HttpContext.RequestServices.GetRequiredService<IMapper>();
    protected ILogger Logger => _logger;
    protected IAuthorizationService AuthorizationService => _authorizationService ??= HttpContext.RequestServices.GetRequiredService<IAuthorizationService>();
    protected IFusionContextResolver ContextResolver => _contextResolver ??= HttpContext.RequestServices.GetRequiredService<IFusionContextResolver>();
}
