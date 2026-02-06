using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnboardAI.Domain.Entities;
using OnboardAI.Infrastructure.Data;
using OnboardAI.Domain.Enums;

namespace OnboardAI.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ClientsController(ApplicationDbContext context)
    {
        _context = context;
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
