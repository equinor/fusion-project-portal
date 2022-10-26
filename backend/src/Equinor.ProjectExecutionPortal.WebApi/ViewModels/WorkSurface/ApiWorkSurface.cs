﻿using Equinor.ProjectExecutionPortal.Application.Queries.WorkSurface;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceAppGroup;
using Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurfaceApplication;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.WorkSurface
{
    public class ApiWorkSurface
    {
        public ApiWorkSurface(WorkSurfaceDto workSurfaceDto)
        {
            Id = workSurfaceDto.Id;
            Name = workSurfaceDto.Name;
            ShortName = workSurfaceDto.ShortName;
            Subtext = workSurfaceDto.SubText;
            Order = workSurfaceDto.Order;
            Icon = workSurfaceDto.Icon;
            Applications = workSurfaceDto.Applications.Select(x => new ApiWorkSurfaceApplication(x)).ToList();
            AppGroups = workSurfaceDto.AppGroups.Select(x => new ApiWorkSurfaceAppGroup(x)).ToList();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public string Subtext { get; set; }
        public int Order { get; set; }
        public string Icon { get; set; }
        public List<ApiWorkSurfaceApplication> Applications { get; set; }
        public List<ApiWorkSurfaceAppGroup> AppGroups { get; set; }
    }
}
