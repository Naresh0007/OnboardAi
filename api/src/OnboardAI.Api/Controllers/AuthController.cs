using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnboardAI.Domain.Entities;
using OnboardAI.Infrastructure.Data;

namespace OnboardAI.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AuthController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost("accept-invite")]
    public async Task<IActionResult> AcceptInvite([FromBody] AcceptInviteDto dto)
    {
        var user = await _context.ClientUsers
            .Include(u => u.Client)
            .FirstOrDefaultAsync(u => u.InviteToken == dto.Token);

        if (user == null)
        {
            return BadRequest("Invalid or expired invite token.");
        }

        user.Name = dto.Name;
        // In a real app, hash this password! For MVP, we store plaintext or simple hash.
        // user.PasswordHash = BCrypt.HashPassword(dto.Password); 
        user.PasswordHash = dto.Password; 
        user.InviteToken = null; // Invalidate token
        user.JoinedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Invite accepted successfully", clientId = user.ClientId });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var user = await _context.ClientUsers
            .Include(u => u.Client)
            .FirstOrDefaultAsync(u => u.Email == dto.Email);

        if (user == null || user.PasswordHash != dto.Password) // MVP: Plaintext check
        {
            return Unauthorized("Invalid email or password.");
        }

        // MVP: Return raw user info instead of JWT
        return Ok(new 
        { 
            id = user.Id,
            name = user.Name,
            email = user.Email,
            clientId = user.ClientId,
            clientName = user.Client.Name,
            role = user.Role
        });
    }
}

public class AcceptInviteDto
{
    public string Token { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class LoginDto
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
