using Equinor.ProjectExecutionPortal.Domain.Entities;

namespace Equinor.ProjectExecutionPortal.Application.Services.ContextTypeService;

public interface IContextTypeService
{
    Task<List<ContextType>> GetAllowedContextTypesByKeys(List<string> contextTypeKeys, CancellationToken cancellationToken);
}
