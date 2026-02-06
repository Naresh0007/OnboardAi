using OnboardAI.Domain.Common;

namespace OnboardAI.Domain.Entities;

/// <summary>
/// Client company being onboarded
/// </summary>
public class Client : BaseEntity, ITenantEntity
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Industry { get; set; }
    public string? CompanySize { get; set; }
    public string? Website { get; set; }
    public string? LogoUrl { get; set; }
    public string Metadata { get; set; } = "{}"; // JSON metadata

    // Tenant relationship
    public Guid TenantId { get; set; }
    public virtual Tenant Tenant { get; set; } = null!;

    // Navigation properties
    public virtual ICollection<Onboarding> Onboardings { get; set; } = new List<Onboarding>();
    public virtual ICollection<ClientUser> ClientUsers { get; set; } = new List<ClientUser>();
}

/// <summary>
/// External user from the client company
/// </summary>
public class ClientUser : BaseEntity
{
    public string Email { get; set; } = string.Empty;
    public string? Name { get; set; }
    public string? PasswordHash { get; set; }
    public string? InviteToken { get; set; }
    public DateTime InvitedAt { get; set; } = DateTime.UtcNow;
    public DateTime? JoinedAt { get; set; }
    public string Role { get; set; } = "primary";

    // Client relationship
    public Guid ClientId { get; set; }
    public virtual Client Client { get; set; } = null!;
}
