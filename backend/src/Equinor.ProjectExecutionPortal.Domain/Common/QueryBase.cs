using MediatR;

namespace Equinor.ProjectExecutionPortal.Domain.Common;

public abstract class QueryBase<T> : IRequest<T>;
