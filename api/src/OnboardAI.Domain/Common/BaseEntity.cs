namespace OnboardAI.Domain.Common;

/// <summary>
/// Base entity with common properties for all domain entities
/// </summary>
public abstract class BaseEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>
/// Interface for entities that belong to a tenant
/// </summary>
public interface ITenantEntity
{
    Guid TenantId { get; set; }
}

/// <summary>
/// Interface for auditable entities
/// </summary>
public interface IAuditableEntity
{
    DateTime CreatedAt { get; set; }
    DateTime UpdatedAt { get; set; }
    string? CreatedBy { get; set; }
    string? UpdatedBy { get; set; }
}

/// <summary>
/// Interface for soft-deletable entities
/// </summary>
public interface ISoftDeletable
{
    bool IsDeleted { get; set; }
    DateTime? DeletedAt { get; set; }
}
