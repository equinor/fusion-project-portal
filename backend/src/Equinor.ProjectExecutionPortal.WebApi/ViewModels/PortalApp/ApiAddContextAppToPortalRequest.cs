﻿using Equinor.ProjectExecutionPortal.Application.Commands.Portals.AddContextAppToPortal;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.PortalApp;

public class ApiAddContextAppToPortalRequest
{
    public required string AppKey { get; set; }

    public AddContextAppToPortalCommand ToCommand(Guid portalId, Guid contextId)
    {
        return new AddContextAppToPortalCommand(portalId, contextId, AppKey);
    }

    public class ApiAddContextAppToPortalRequestValidator : AbstractValidator<ApiAddContextAppToPortalRequest>
    {
        public ApiAddContextAppToPortalRequestValidator()
        {
            RuleFor(x => x.AppKey)
                .NotEmpty()
                .NotContainScriptTag()
                .WithMessage("AppKey required");
        }
    }
}