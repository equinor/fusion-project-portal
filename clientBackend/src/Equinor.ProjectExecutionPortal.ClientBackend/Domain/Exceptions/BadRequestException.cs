namespace Equinor.ProjectExecutionPortal.ClientBackend.Domain.Exceptions;

public class BadRequestException : ApplicationException
{
    public BadRequestException(string? message)
        : base("Bad request", message, null)
    {
    }

    public BadRequestException(string? message, Exception ex)
        : base("Bad request", message, ex)
    {
    }
}
