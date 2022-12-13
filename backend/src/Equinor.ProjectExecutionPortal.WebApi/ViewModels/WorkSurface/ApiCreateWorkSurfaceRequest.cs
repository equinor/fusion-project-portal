﻿using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.CreateWorkSurface;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurface
{
    public class ApiCreateWorkSurfaceRequest
    {
        public string Name { get; set; }
        public string ShortName { get; set; }
        public string Subtext { get; set; }
        public int Order { get; set; }
        public string Icon { get; set; }

        public CreateWorkSurfaceCommand ToCommand()
        {
            return new CreateWorkSurfaceCommand(Name, ShortName, Subtext, Order, Icon);
        }

        public class CreateWorkSurfaceRequestValidator : AbstractValidator<ApiCreateWorkSurfaceRequest>
        {
            public CreateWorkSurfaceRequestValidator()
            {
                RuleFor(x => x.Name)
                    .NotEmpty()
                    .NotContainScriptTag()
                    .WithMessage("Name required");

                RuleFor(x => x.Order)
                    .NotEmpty()
                    .WithMessage("Order required");
            }
        }
    }
}
