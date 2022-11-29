namespace Equinor.ProjectExecutionPortal.Domain.Common.Audit;

/// <summary>
/// Interface to get and set creation data on an entity.
/// The methods are used by the context and should NOT be used by anyone else.
/// </summary>
public interface ICreationAuditable
{
    DateTime CreatedAtUtc { get; }
    Guid? CreatedByAzureOid { get; }

    /// <summary>
    /// Method to set creation data on an entity.
    /// This is used by the context and should NOT be used by anyone else.
    /// </summary>
    /// <param name="createdbyAzureOid">The user who created the entity</param>
    void SetCreated(Guid createdbyAzureOid);
}
