using Equinor.ProjectExecutionPortal.Application.Queries.ContextTypes;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.ContextType
{
    public class ApiContextType
    {
        public ApiContextType()
        { }

        public ApiContextType(ContextTypeDto contextTypeDto)
        {
            Type = contextTypeDto.ContextTypeKey;
        }

        public string Type { get; set; }
    }
}
