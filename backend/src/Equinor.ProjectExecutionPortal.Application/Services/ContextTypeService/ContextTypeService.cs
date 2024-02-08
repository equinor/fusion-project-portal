using Equinor.ProjectExecutionPortal.Application.Queries.ContextTypes;
using Equinor.ProjectExecutionPortal.Domain.Entities;
using Equinor.ProjectExecutionPortal.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Services.ContextTypeService
{
    public class ContextTypeService : IContextTypeService
    {
        private readonly IReadWriteContext _readWriteContext;

        public ContextTypeService(IReadWriteContext readWriteContext)
        {
            _readWriteContext = readWriteContext;
        }
        public async Task<IList<ContextType>> GetCombinedNewAndExistingContextTypesByContextTypeKey(IList<string> contextTypeKeys, CancellationToken cancellationToken)
        {

            if (contextTypeKeys.Count == 0)
            {
                return new List<ContextType>();
            }

            var existingContextTypes = await _readWriteContext.Set<ContextType>()
                .Where(contextType => contextTypeKeys.Select(key => key).Contains(contextType.ContextTypeKey))
                .ToListAsync();

            var newContextTypes = contextTypeKeys
                .Where(key => !existingContextTypes.Select(contextType => contextType.ContextTypeKey).Contains(key))
                .Select(x => new ContextType(x));

            return existingContextTypes.Concat(newContextTypes).ToList();
        }
    }
}
