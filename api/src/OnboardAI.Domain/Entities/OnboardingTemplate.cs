using OnboardAI.Domain.Common;

namespace OnboardAI.Domain.Entities;

/// <summary>
/// Reusable onboarding workflow template
/// </summary>
public class OnboardingTemplate : BaseEntity, ITenantEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? IndustryType { get; set; }
    public bool IsActive { get; set; } = true;
    public bool IsDefault { get; set; } = false;
    public string AiRules { get; set; } = "{}"; // JSON AI configuration rules

    // Tenant relationship
    public Guid TenantId { get; set; }
    public virtual Tenant Tenant { get; set; } = null!;

    // Navigation properties
    public virtual ICollection<StageTemplate> Stages { get; set; } = new List<StageTemplate>();
    public virtual ICollection<Onboarding> Onboardings { get; set; } = new List<Onboarding>();
}

/// <summary>
/// Stage within an onboarding template
/// </summary>
public class StageTemplate : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int Order { get; set; }
    public string Color { get; set; } = "#3B82F6";

    // Template relationship
    public Guid TemplateId { get; set; }
    public virtual OnboardingTemplate Template { get; set; } = null!;

    // Navigation properties
    public virtual ICollection<TaskTemplate> Tasks { get; set; } = new List<TaskTemplate>();
}

/// <summary>
/// Task template within a stage
/// </summary>
public class TaskTemplate : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public Enums.TaskType Type { get; set; } = Enums.TaskType.Action;
    public bool IsRequired { get; set; } = true;
    public int Order { get; set; }
    public int? DaysToComplete { get; set; }
    public string Metadata { get; set; } = "{}"; // JSON metadata

    // Stage relationship
    public Guid StageId { get; set; }
    public virtual StageTemplate Stage { get; set; } = null!;
}
