namespace Equinor.ProjectExecutionPortal.ClientBackend.Domain.Exceptions;

public class NotFoundException : ApplicationException
{
    public NotFoundException(string? message)
        : base("Not found", message, null)
    {
    }

    public NotFoundException(string? message, Exception ex)
        : base("Not found", message, ex)
    {
    }

    public NotFoundException(string name, object key)
        : base("Not found", $"Entity \"{name}\" ({key}) was not found.", null)
    {
    }
}
