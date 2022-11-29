using AutoMapper;

namespace Equinor.ProjectExecutionPortal.Application.Infrastructure.Mappings;

public interface IMapFrom<T>
{
    void Mapping(Profile profile) => profile.CreateMap(typeof(T), GetType());
}
