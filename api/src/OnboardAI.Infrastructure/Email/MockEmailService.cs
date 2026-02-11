using OnboardAI.Application.Interfaces;
using Microsoft.Extensions.Logging;

namespace OnboardAI.Infrastructure.Email;

public class MockEmailService : IEmailService
{
    private readonly ILogger<MockEmailService> _logger;

    public MockEmailService(ILogger<MockEmailService> logger)
    {
        _logger = logger;
    }

    public Task SendEmailAsync(string to, string subject, string body)
    {
        _logger.LogInformation($"[MockEmail] To: {to} | Subject: {subject} | Body: {body}");
        return Task.CompletedTask;
    }

    public Task SendInvitationEmailAsync(string to, string clientName, string token)
    {
        var subject = $"Welcome to OnboardAI - {clientName}";
        var body = $"You have been invited to join the onboarding portal for {clientName}.\n" +
                   $"Please click the link below to get started:\n" +
                   $"http://localhost:3000/invite?token={token}\n\n" +
                   $"Best,\nThe OnboardAI Team";
        
        return SendEmailAsync(to, subject, body);
    }
}
