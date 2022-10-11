namespace Equinor.ProjectExecutionPortal.Domain.Common.Exceptions
{
    public abstract class ApplicationException : Exception
    {
        protected ApplicationException(string title, string? message, Exception? exception) : base(message, exception) =>
            Title = title;

        public string Title { get; }
    }
}
