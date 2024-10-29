using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Services.ContextTypeService
{
    public class ContextTypeService(IReadWriteContext readWriteContext) : IContextTypeService
    {
        public async Task<IList<ContextType>> GetAllowedContextTypesByKeys(IList<string> contextTypeKeys, CancellationToken cancellationToken)
        {
            if (contextTypeKeys.Count == 0)
            {
                return [];
            }

            var availableContextTypes = await readWriteContext.Set<ContextType>().ToListAsync(cancellationToken);

            var invalidContextTypes = contextTypeKeys.FirstOrDefault(key => !availableContextTypes.Select(contextType => contextType.ContextTypeKey).Contains(key));

            if (invalidContextTypes != null)
            {
                throw new InvalidActionException($"Context-type is not supported: {invalidContextTypes}");
            }

            var addContextTypes = availableContextTypes.Where(contextType => contextTypeKeys.Select(key => key).Contains(contextType.ContextTypeKey)).ToList();

            return addContextTypes.ToList();
        }
    }
}
