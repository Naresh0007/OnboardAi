using OnboardAI.Domain.Common;
using OnboardAI.Domain.Enums;

namespace OnboardAI.Domain.Entities;

/// <summary>
/// Active onboarding instance for a client
/// </summary>
public class Onboarding : BaseEntity
{
    public OnboardingStatus Status { get; set; } = OnboardingStatus.NotStarted;
    public DateTime? TargetDate { get; set; }
    public DateTime? StartedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public string AiCustomizations { get; set; } = "{}"; // JSON AI customizations
    public string Metadata { get; set; } = "{}"; // JSON metadata

    // Client relationship
    public Guid ClientId { get; set; }
    public virtual Client Client { get; set; } = null!;

    // Template relationship
    public Guid TemplateId { get; set; }
    public virtual OnboardingTemplate Template { get; set; } = null!;

    // Navigation properties
    public virtual ICollection<StageInstance> Stages { get; set; } = new List<StageInstance>();
    public virtual RiskScore? RiskScore { get; set; }
    public virtual ICollection<ActivityLog> ActivityLogs { get; set; } = new List<ActivityLog>();
}

/// <summary>
/// Instance of a stage within an active onboarding
/// </summary>
public class StageInstance : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int Order { get; set; }
    public string Color { get; set; } = "#3B82F6";
    public StageStatus Status { get; set; } = StageStatus.Pending;
    public DateTime? StartedAt { get; set; }
    public DateTime? CompletedAt { get; set; }

    // Onboarding relationship
    public Guid OnboardingId { get; set; }
    public virtual Onboarding Onboarding { get; set; } = null!;

    // Navigation properties
    public virtual ICollection<OnboardingTask> Tasks { get; set; } = new List<OnboardingTask>();
}

/// <summary>
/// Individual task within an onboarding stage
/// </summary>
public class OnboardingTask : BaseEntity, IAuditableEntity
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public Enums.TaskType Type { get; set; } = Enums.TaskType.Action;
    public Enums.TaskStatus Status { get; set; } = Enums.TaskStatus.Pending;
    public bool IsRequired { get; set; } = true;
    public int Order { get; set; }
    public DateTime? DueDate { get; set; }
    public DateTime? CompletedAt { get; set; }
    public string AiMetadata { get; set; } = "{}"; // JSON AI metadata

    // Stage relationship
    public Guid StageId { get; set; }
    public virtual StageInstance Stage { get; set; } = null!;

    // Optional assignment to user
    public Guid? AssignedToId { get; set; }
    public virtual User? AssignedTo { get; set; }

    // Audit fields
    public string? CreatedBy { get; set; }
    public string? UpdatedBy { get; set; }

    // Navigation properties
    public virtual ICollection<Document> Documents { get; set; } = new List<Document>();
    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
}
