using OnboardAI.Domain.Common;
using OnboardAI.Domain.Enums;

namespace OnboardAI.Domain.Entities;

/// <summary>
/// Document uploaded for a task
/// </summary>
public class Document : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string FileName { get; set; } = string.Empty;
    public string FileUrl { get; set; } = string.Empty;
    public long FileSize { get; set; }
    public string MimeType { get; set; } = string.Empty;
    public DocumentStatus Status { get; set; } = DocumentStatus.Uploaded;
    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

    // Task relationship
    public Guid TaskId { get; set; }
    public virtual OnboardingTask Task { get; set; } = null!;
}

/// <summary>
/// Comment on a task
/// </summary>
public class Comment : BaseEntity
{
    public string Content { get; set; } = string.Empty;
    public bool IsInternal { get; set; } = false; // Internal = not visible to client

    // Task relationship
    public Guid TaskId { get; set; }
    public virtual OnboardingTask Task { get; set; } = null!;

    // Author relationship
    public Guid AuthorId { get; set; }
    public virtual User Author { get; set; } = null!;
}

/// <summary>
/// AI-calculated risk score for an onboarding
/// </summary>
public class RiskScore : BaseEntity
{
    public int Score { get; set; } // 0-100
    public RiskLevel Level { get; set; }
    public string Factors { get; set; } = "[]"; // JSON array of risk factors
    public string Suggestions { get; set; } = "[]"; // JSON array of AI suggestions
    public DateTime CalculatedAt { get; set; } = DateTime.UtcNow;

    // Onboarding relationship
    public Guid OnboardingId { get; set; }
    public virtual Onboarding Onboarding { get; set; } = null!;
}

/// <summary>
/// Activity log for audit trail
/// </summary>
public class ActivityLog : BaseEntity
{
    public string Action { get; set; } = string.Empty;
    public string EntityType { get; set; } = string.Empty;
    public string EntityId { get; set; } = string.Empty;
    public string Metadata { get; set; } = "{}"; // JSON metadata

    // User relationship (optional for system actions)
    public Guid? UserId { get; set; }
    public virtual User? User { get; set; }

    // Onboarding relationship (optional)
    public Guid? OnboardingId { get; set; }
    public virtual Onboarding? Onboarding { get; set; }
}

/// <summary>
/// Team member invitation
/// </summary>
public class Invitation : BaseEntity, ITenantEntity
{
    public string Email { get; set; } = string.Empty;
    public UserRole Role { get; set; } = UserRole.Member;
    public string Token { get; set; } = Guid.NewGuid().ToString();
    public InvitationStatus Status { get; set; } = InvitationStatus.Pending;
    public DateTime ExpiresAt { get; set; }

    // Tenant relationship
    public Guid TenantId { get; set; }
    public virtual Tenant Tenant { get; set; } = null!;
}
