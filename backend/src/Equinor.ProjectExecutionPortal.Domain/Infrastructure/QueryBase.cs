using MediatR;

namespace Equinor.ProjectExecutionPortal.Domain.Infrastructure
{
    public abstract class QueryBase<T> : IRequest<T>
    {
    }
}
