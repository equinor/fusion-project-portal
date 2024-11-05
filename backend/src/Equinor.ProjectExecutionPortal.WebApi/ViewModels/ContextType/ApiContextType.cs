using Equinor.ProjectExecutionPortal.Application.Queries.ContextTypes;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.ContextType;

public class ApiContextType
{
#pragma warning disable CS8618 // For integration tests only
    public ApiContextType()
#pragma warning restore CS8618 // For integration tests only
    {
    }

    public ApiContextType(ContextTypeDto contextTypeDto)
    {
        Type = contextTypeDto.ContextTypeKey;
    }

    public string Type { get; set; }
}
