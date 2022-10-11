namespace Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;

public class InvalidProjectException : ApplicationException
{
    public InvalidProjectException(string? message) : base("Project not valid", message, null)
    {
    }
}
