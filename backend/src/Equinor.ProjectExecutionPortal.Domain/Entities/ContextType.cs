using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;

namespace Equinor.ProjectExecutionPortal.Domain.Entities
{
    public class ContextType : AuditableEntityBase, ICreationAuditable, IModificationAuditable
    {
        public const int ContextTypeKeyLengthMax = 200;

        private readonly List<WorkSurface> _workSurfaces = new();

        public ContextType(string contextTypeKey)
        {
            ContextTypeKey = contextTypeKey;
        }

        public string ContextTypeKey { get; set; }

        public IReadOnlyCollection<WorkSurface> WorkSurfaces => _workSurfaces.AsReadOnly();
    }
}
