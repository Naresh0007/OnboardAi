using OnboardAI.Domain.Entities;

namespace OnboardAI.Application.Interfaces;

public interface IAiService
{
    /// <summary>
    /// Generates a template structure (stages and tasks) based on a natural language prompt.
    /// </summary>
    /// <param name="prompt">User's description of the onboarding process.</param>
    /// <returns>A populated but unsaved OnboardingTemplate object.</returns>
    Task<OnboardingTemplate> GenerateTemplateAsync(string prompt);
}
