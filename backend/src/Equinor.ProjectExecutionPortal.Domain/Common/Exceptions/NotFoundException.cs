namespace Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;

public class NotFoundException : ApplicationException
{
    public NotFoundException()
        : base("Not found", "", null)
    {
    }

    public NotFoundException(string? message)
        : base("Not found", message, null)
    {
    }

    public NotFoundException(string? message, Exception ex)
        : base("",message, ex)
    {
    }

    public NotFoundException(string name, object key)
        : base("Not found", $"Entity \"{name}\" ({key}) was not found.", null)
    {
    }
}
