﻿using Equinor.ProjectExecutionPortal.Application.Commands.WorkSurfaces.UpdateAppGroup;
using FluentValidation;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.AppGroup
{
    public class ApiUpdateAppGroupRequest
    {
        public string Name { get; set; }
        public string AccentColor { get; set; }

        public UpdateAppGroupCommand ToCommand(Guid appGroupId)
        {
            return new UpdateAppGroupCommand(appGroupId, Name, AccentColor);
        }

        public class UpdateAppGroupRequestValidator : AbstractValidator<ApiUpdateAppGroupRequest>
        {
            public UpdateAppGroupRequestValidator()
            {
                RuleFor(x => x.Name)
                    .NotEmpty()
                    .NotContainScriptTag()
                    .WithMessage("Name required");

                RuleFor(x => x.AccentColor)
                    .MaximumLength(Domain.Entities.AppGroup.AccentColorLengthMax)
                    .NotContainScriptTag();
            }
        }
    }
}
