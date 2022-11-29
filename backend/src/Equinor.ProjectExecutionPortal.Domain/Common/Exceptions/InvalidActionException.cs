namespace Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;

public class InvalidActionException : ApplicationException
{
    public InvalidActionException()
        : base("Invalid action", null, null)
    {
    }

    public InvalidActionException(string? message)
        : base("Invalid action", message, null)
    {
    }

    public InvalidActionException(string message, Exception innerException)
        : base("Invalid action", message, innerException)
    {
    }
}
