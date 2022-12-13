namespace Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;

public class ConcurrencyException : ApplicationException
{
    public ConcurrencyException(string? message) : base("Concurrency error", message, null)
    {
    }

    public ConcurrencyException(string? message, Exception innerException) : base("Concurrency error", message, innerException)
    {
    }
}
