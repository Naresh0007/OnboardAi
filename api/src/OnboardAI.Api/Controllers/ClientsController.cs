using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnboardAI.Domain.Entities;
using OnboardAI.Infrastructure.Data;
using OnboardAI.Domain.Enums;
using OnboardAI.Application.Interfaces;

namespace OnboardAI.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IEmailService _emailService;

    public ClientsController(ApplicationDbContext context, IEmailService emailService)
    {
        _context = context;
        _emailService = emailService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Client>>> GetClients()
    {
        return await _context.Clients
            .Include(c => c.Onboardings)
            .OrderByDescending(c => c.CreatedAt)
            .ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Client>> CreateClient(ClientDto clientDto)
    {
        var tenant = await _context.Tenants.FirstOrDefaultAsync();
        if (tenant == null)
        {
            return BadRequest("No tenant found. Please seed the database.");
        }

        var client = new Client
        {
            Name = clientDto.Name,
            Email = clientDto.Email,
            Website = clientDto.Website,
            Industry = clientDto.Industry,
            CompanySize = clientDto.CompanySize,
            TenantId = tenant.Id
        };
        _context.Clients.Add(client);
        
        // Create Primary Client User
        var inviteToken = Guid.NewGuid().ToString();
        var clientUser = new ClientUser
        {
            Client = client,
            Email = clientDto.Email,
            Name = clientDto.Name,
            Role = "admin",
            InviteToken = inviteToken,
            InvitedAt = DateTime.UtcNow
        };
        _context.ClientUsers.Add(clientUser);

        // Try to get a real template, or fallback to an empty Guid if needed
        var template = await _context.OnboardingTemplates.FirstOrDefaultAsync();
        
        // Create a default onboarding
        var onboarding = new Onboarding
        {
            Client = client,
            TemplateId = template?.Id ?? Guid.Empty, 
            Status = OnboardingStatus.InProgress
        };
        _context.Onboardings.Add(onboarding);

        await _context.SaveChangesAsync();

        // Send Invite Email
        await _emailService.SendInvitationEmailAsync(client.Email, client.Name, inviteToken);

        return CreatedAtAction(nameof(GetClients), new { id = client.Id }, client);
    }
}

public class ClientDto
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Website { get; set; }
    public string? Industry { get; set; }
    public string? CompanySize { get; set; }
}
