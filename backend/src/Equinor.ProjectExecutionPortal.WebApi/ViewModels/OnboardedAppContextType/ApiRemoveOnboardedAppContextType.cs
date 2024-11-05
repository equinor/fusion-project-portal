using Equinor.ProjectExecutionPortal.Application.Commands.OnboardedApps.RemoveContextTypeFromOnboardedApp;

namespace Equinor.ProjectExecutionPortal.WebApi.ViewModels.OnboardedAppContextType;

public class ApiRemoveOnboardedAppContextType
{
    public RemoveContextTypeFromFromOnboardedAppCommand ToCommand(string appKey, string contextType)
    {
        return new RemoveContextTypeFromFromOnboardedAppCommand(appKey, contextType);
    }
}