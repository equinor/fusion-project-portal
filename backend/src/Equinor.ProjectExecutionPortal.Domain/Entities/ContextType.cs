using Equinor.ProjectExecutionPortal.Domain.Common;
using Equinor.ProjectExecutionPortal.Domain.Common.Audit;

namespace Equinor.ProjectExecutionPortal.Domain.Entities
{
    public class ContextType : AuditableEntityBase, ICreationAuditable, IModificationAuditable
    {
        public const int ContextTypeKeyLengthMax = 200;

        private readonly List<Portal> _portals = new();
        private readonly List<OnboardedApp> _onboardedApps = new();

        public ContextType(string contextTypeKey)
        {
            ContextTypeKey = contextTypeKey;
        }

        public string ContextTypeKey { get; set; }

        public IReadOnlyCollection<Portal> Portals => _portals.AsReadOnly();
        public IReadOnlyCollection<OnboardedApp> OnboardedApps => _onboardedApps.AsReadOnly();
    }
}
