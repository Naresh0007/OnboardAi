using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnboardAI.Domain.Entities;
using OnboardAI.Infrastructure.Data;
using OnboardAI.Domain.Enums;

namespace OnboardAI.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public DashboardController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("stats")]
    public async Task<ActionResult<DashboardStatsDto>> GetStats()
    {
        var onboardings = await _context.Onboardings
            .Include(o => o.RiskScore)
            .ToListAsync();

        var activeCount = onboardings.Count(o => o.Status == OnboardingStatus.InProgress);
        
        // Completed this month
        var now = DateTime.UtcNow;
        var startOfMonth = new DateTime(now.Year, now.Month, 1);
        var completedMonthCount = onboardings.Count(o => 
            o.Status == OnboardingStatus.Completed && 
            o.CompletedAt >= startOfMonth);

        // Average days to complete (for all completed ever)
        var allCompleted = onboardings.Where(o => o.Status == OnboardingStatus.Completed && o.StartedAt.HasValue && o.CompletedAt.HasValue).ToList();
        double avgDays = 0;
        if (allCompleted.Any())
        {
            avgDays = allCompleted.Average(o => (o.CompletedAt!.Value - o.StartedAt!.Value).TotalDays);
        }

        // At Risk
        // Logic: RiskScore is High/Critical OR TargetDate is passed and not completed
        var atRiskCount = onboardings.Count(o => 
            (o.RiskScore != null && (o.RiskScore.Level == RiskLevel.High || o.RiskScore.Level == RiskLevel.Critical)) ||
            (o.Status == OnboardingStatus.InProgress && o.TargetDate.HasValue && o.TargetDate.Value < now)
        );

        // Calculate trends (mocked for MVP as we don't have historical snapshots)
        return new DashboardStatsDto
        {
            ActiveOnboardings = new StatItem { Value = activeCount.ToString(), Change = "+0%", Trend = "neutral" },
            CompletedThisMonth = new StatItem { Value = completedMonthCount.ToString(), Change = "+0%", Trend = "neutral" },
            AvgTimeToComplete = new StatItem { Value = $"{avgDays:F1} days", Change = "0%", Trend = "neutral" },
            AtRisk = new StatItem { Value = atRiskCount.ToString(), Change = "0", Trend =atRiskCount > 0 ? "down" : "neutral" }
        };
    }

    [HttpGet("recent")]
    public async Task<ActionResult<IEnumerable<RecentOnboardingDto>>> GetRecentOnboardings()
    {
        var recent = await _context.Onboardings
            .Include(o => o.Client)
            .Include(o => o.RiskScore)
            .Include(o => o.Stages)
                .ThenInclude(s => s.Tasks)
            .OrderByDescending(o => o.StartedAt ?? o.CreatedAt)
            .Take(5)
            .ToListAsync();

        var dtos = recent.Select(o =>
        {
            // Calculate progress
            var allTasks = o.Stages.SelectMany(s => s.Tasks).ToList();
            var totalTasks = allTasks.Count;
            var completedTasks = allTasks.Count(t => t.Status == OnboardAI.Domain.Enums.TaskStatus.Completed);
            var progress = totalTasks > 0 ? (int)((double)completedTasks / totalTasks * 100) : 0;

            // Determine stage (first active stage or completed)
            var currentStage = o.Stages.OrderBy(s => s.Order).FirstOrDefault(s => s.Status == StageStatus.Active)?.Name 
                               ?? o.Stages.OrderBy(s => s.Order).LastOrDefault(s => s.Status == StageStatus.Completed)?.Name 
                               ?? "Kickoff";

            // Risk Level
            var riskLevel = "LOW";
            if (o.RiskScore != null)
            {
                riskLevel = o.RiskScore.Level.ToString().ToUpper();
            }
            else if (o.TargetDate.HasValue && o.TargetDate.Value < DateTime.UtcNow)
            {
                riskLevel = "HIGH"; // Overdue
            }

            // Days remaining
            var daysRemaining = o.TargetDate.HasValue ? (int)(o.TargetDate.Value - DateTime.UtcNow).TotalDays : 0;

            return new RecentOnboardingDto
            {
                Id = o.Id.ToString(),
                Client = o.Client.Name,
                Email = o.Client.Email,
                Status = o.Status.ToString().ToUpper(), // "IN_PROGRESS"
                Progress = progress,
                RiskLevel = riskLevel,
                DaysRemaining = daysRemaining,
                Stage = currentStage
            };
        });

        return Ok(dtos);
    }
}

public class DashboardStatsDto
{
    public StatItem ActiveOnboardings { get; set; } = new();
    public StatItem CompletedThisMonth { get; set; } = new();
    public StatItem AvgTimeToComplete { get; set; } = new();
    public StatItem AtRisk { get; set; } = new();
}

public class StatItem
{
    public string Value { get; set; } = "0";
    public string Change { get; set; } = "0%";
    public string Trend { get; set; } = "neutral"; // up, down, neutral
}

public class RecentOnboardingDto
{
    public string Id { get; set; } = string.Empty;
    public string Client { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public int Progress { get; set; }
    public string RiskLevel { get; set; } = "LOW";
    public int DaysRemaining { get; set; }
    public string Stage { get; set; } = string.Empty;
}
