using OnboardAI.Application.Interfaces;
using OnboardAI.Domain.Entities;
using OnboardAI.Domain.Enums;

namespace OnboardAI.Infrastructure.AI;

public class MockAiService : IAiService
{
    public Task<OnboardingTemplate> GenerateTemplateAsync(string prompt)
    {
        // Simulate AI "thinking" delay
        Thread.Sleep(500);

        var template = new OnboardingTemplate
        {
            Name = "Suggested Template",
            Description = $"Generated based on: {prompt}",
            IndustryType = DetectIndustry(prompt),
            IsActive = true
        };

        if (prompt.ToLower().Contains("medical") || prompt.ToLower().Contains("health"))
        {
            GenerateMedicalTemplate(template);
        }
        else if (prompt.ToLower().Contains("finance") || prompt.ToLower().Contains("crypto") || prompt.ToLower().Contains("fintech")) 
        {
            GenerateFintechTemplate(template);
        }
        else
        {
            GenerateGenericTemplate(template);
        }

        return Task.FromResult(template);
    }

    private string DetectIndustry(string prompt)
    {
        var p = prompt.ToLower();
        if (p.Contains("medical") || p.Contains("health")) return "Healthcare";
        if (p.Contains("finance") || p.Contains("fintech") || p.Contains("crypto")) return "Fintech";
        if (p.Contains("saas") || p.Contains("software")) return "Technology";
        return "General";
    }

    private void GenerateMedicalTemplate(OnboardingTemplate template)
    {
        template.Name = "Healthcare Compliance Onboarding";
        
        var stage1 = new StageTemplate { Name = "Legal & Compliance", Order = 1, Description = "HIPAA and regulatory checks" };
        stage1.Tasks.Add(new TaskTemplate { Title = "Sign BAA (Business Associate Agreement)", Type = TaskType.ESign, IsRequired = true, Order = 1 });
        stage1.Tasks.Add(new TaskTemplate { Title = "Data Processing Addendum", Type = TaskType.ESign, IsRequired = true, Order = 2 });
        stage1.Tasks.Add(new TaskTemplate { Title = "Upload HIPAA Compliance Cert", Type = TaskType.Document, IsRequired = true, Order = 3 });

        var stage2 = new StageTemplate { Name = "Technical Integration", Order = 2, Description = "Secure data exchange setup" };
        stage2.Tasks.Add(new TaskTemplate { Title = "Configure VPN Tunnel", Type = TaskType.Action, Order = 1 });
        stage2.Tasks.Add(new TaskTemplate { Title = "SFTP Credentials Exchange", Type = TaskType.Form, Order = 2 });

        template.Stages.Add(stage1);
        template.Stages.Add(stage2);
    }

    private void GenerateFintechTemplate(OnboardingTemplate template)
    {
        template.Name = "Fintech Client Onboarding";

        var stage1 = new StageTemplate { Name = "KYC / KYB", Order = 1, Description = "Identify verification" };
        stage1.Tasks.Add(new TaskTemplate { Title = "Upload Articles of Incorporation", Type = TaskType.Document, IsRequired = true, Order = 1 });
        stage1.Tasks.Add(new TaskTemplate { Title = "Beneficial Owner Identification", Type = TaskType.Form, IsRequired = true, Order = 2 });

        var stage2 = new StageTemplate { Name = "Financial Setup", Order = 2 };
        stage2.Tasks.Add(new TaskTemplate { Title = "Connect Bank Account", Type = TaskType.Action, IsRequired = true, Order = 1 });
        stage2.Tasks.Add(new TaskTemplate { Title = "Set Transaction Limits", Type = TaskType.Form, Order = 2 });

        template.Stages.Add(stage1);
        template.Stages.Add(stage2);
    }

    private void GenerateGenericTemplate(OnboardingTemplate template)
    {
        template.Name = "Standard Onboarding";

        var stage1 = new StageTemplate { Name = "Kickoff", Order = 1 };
        stage1.Tasks.Add(new TaskTemplate { Title = "Schedule Kickoff Call", Type = TaskType.Meeting, IsRequired = true, Order = 1 });
        stage1.Tasks.Add(new TaskTemplate { Title = "Point of Contact Form", Type = TaskType.Form, IsRequired = true, Order = 2 });

        var stage2 = new StageTemplate { Name = "Implementation", Order = 2 };
        stage2.Tasks.Add(new TaskTemplate { Title = "System Configuration", Type = TaskType.Action, Order = 1 });
        stage2.Tasks.Add(new TaskTemplate { Title = "User Training", Type = TaskType.Meeting, Order = 2 });

        template.Stages.Add(stage1);
        template.Stages.Add(stage2);
    }
}
