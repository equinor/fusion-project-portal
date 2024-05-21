using Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;
using Equinor.ProjectExecutionPortal.Application.Queries.ContextTypes;

namespace Equinor.ProjectExecutionPortal.Application.Queries.WorkSurfaces
{
    public class WorkSurfaceDto : IMapFrom<Domain.Entities.Portal>
    {
        public Guid Id { get; set; }
        public string Key { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public string SubText { get; set; }
        public string? Description { get; set; }
        public int Order { get; set; }
        public string Icon { get; set; }
        public bool IsDefault { get; set; }
        public IList<ContextTypeDto> ContextTypes { get; set; }
        public List<WorkSurfaceAppDto> Apps { get; set; }
    }
}
