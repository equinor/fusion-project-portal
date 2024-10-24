using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Application.Services.ContextTypeService
{
    public interface IContextTypeService
    {
        Task<IList<ContextType>> GetAllowedContextTypesByKeys(IList<string> contextTypeKeys, CancellationToken cancellationToken);
    }
}
