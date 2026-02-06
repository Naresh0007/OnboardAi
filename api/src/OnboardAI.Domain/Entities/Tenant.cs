using OnboardAI.Domain.Common;

namespace OnboardAI.Domain.Entities;

/// <summary>
/// Represents a tenant (company) in the multi-tenant system
/// </summary>
public class Tenant : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Subdomain { get; set; } = string.Empty;
    public string? LogoUrl { get; set; }
    public string? PrimaryColor { get; set; }
    public string Settings { get; set; } = "{}"; // JSON settings

    // Navigation properties
    public virtual ICollection<User> Users { get; set; } = new List<User>();
    public virtual ICollection<Client> Clients { get; set; } = new List<Client>();
    public virtual ICollection<OnboardingTemplate> Templates { get; set; } = new List<OnboardingTemplate>();
    public virtual ICollection<Invitation> Invitations { get; set; } = new List<Invitation>();
}
