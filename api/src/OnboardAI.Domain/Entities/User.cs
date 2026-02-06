using OnboardAI.Domain.Common;
using OnboardAI.Domain.Enums;

namespace OnboardAI.Domain.Entities;

/// <summary>
/// Internal user (admin/team member) of the tenant
/// </summary>
public class User : BaseEntity, ITenantEntity, IAuditableEntity
{
    public string Email { get; set; } = string.Empty;
    public string? Name { get; set; }
    public string? PasswordHash { get; set; }
    public string? Image { get; set; }
    public DateTime? EmailVerified { get; set; }
    public UserRole Role { get; set; } = UserRole.Member;
    public bool IsActive { get; set; } = true;
    
    // Tenant relationship
    public Guid TenantId { get; set; }
    public virtual Tenant Tenant { get; set; } = null!;
    
    // Audit fields
    public string? CreatedBy { get; set; }
    public string? UpdatedBy { get; set; }

    // Refresh token for JWT
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiryTime { get; set; }

    // Navigation properties
    public virtual ICollection<OnboardingTask> AssignedTasks { get; set; } = new List<OnboardingTask>();
    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
    public virtual ICollection<ActivityLog> ActivityLogs { get; set; } = new List<ActivityLog>();
}
