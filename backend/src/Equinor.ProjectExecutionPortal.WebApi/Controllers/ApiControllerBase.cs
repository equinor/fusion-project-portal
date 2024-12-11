using Fusion.Integration;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Equinor.ProjectExecutionPortal.WebApi.Controllers;

[ApiController]
public abstract class ApiControllerBase : Controller
{
    private ISender? _mediator;
    private IFusionContextResolver? _contextResolver;

    protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<ISender>();
    protected IFusionContextResolver ContextResolver => _contextResolver ??= HttpContext.RequestServices.GetRequiredService<IFusionContextResolver>();
}
