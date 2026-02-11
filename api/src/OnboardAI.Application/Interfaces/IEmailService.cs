namespace OnboardAI.Application.Interfaces;

public interface IEmailService
{
    Task SendEmailAsync(string to, string subject, string body);
    Task SendInvitationEmailAsync(string to, string clientName, string token);
}
