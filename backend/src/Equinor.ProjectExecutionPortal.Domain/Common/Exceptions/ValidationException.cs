namespace Equinor.ProjectExecutionPortal.Domain.Common.Exceptions
{
    public sealed class ValidationException : ApplicationException
    {
        public ValidationException(IReadOnlyDictionary<string, string[]>? errorsDictionary)
            : base("Validation Failure", "One or more validation errors occurred", null)
            => ErrorsDictionary = errorsDictionary;

        public IReadOnlyDictionary<string, string[]>? ErrorsDictionary { get; }
    }
}
