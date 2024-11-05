using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Services.ContextTypeService;

public class ContextTypeService : IContextTypeService
{
    private readonly IReadWriteContext _readWriteContext;

    public ContextTypeService(IReadWriteContext readWriteContext)
    {
        _readWriteContext = readWriteContext;
    }

    public async Task<IList<ContextType>> GetAllowedContextTypesByKeys(IList<string> contextTypeKeys, CancellationToken cancellationToken)
    {
        if (contextTypeKeys.Count == 0)
        {
            return [];
        }

        var availableContextTypes = await _readWriteContext.Set<ContextType>().ToListAsync(cancellationToken);

        var invalidContextTypes = contextTypeKeys
            .Where(key => !availableContextTypes
                .Select(contextType => contextType.ContextTypeKey)
                .Contains(key))
            .ToList();

        if (invalidContextTypes != null && invalidContextTypes.Any())
        {
            throw new InvalidOperationException($"Context-type is not supported: {string.Join(",", invalidContextTypes)}");
        }

        var contextTypesToAdd = availableContextTypes
            .Where(contextType => contextTypeKeys
                .Contains(contextType.ContextTypeKey))
            .ToList();

        return contextTypesToAdd.ToList();
    }
}