using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnboardAI.Application.Interfaces;
using OnboardAI.Domain.Entities;
using OnboardAI.Infrastructure.Data;

namespace OnboardAI.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TemplatesController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IAiService _aiService;

    public TemplatesController(ApplicationDbContext context, IAiService aiService)
    {
        _context = context;
        _aiService = aiService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<OnboardingTemplate>>> GetTemplates()
    {
        return await _context.OnboardingTemplates
            .Include(t => t.Stages)
            .ThenInclude(s => s.Tasks)
            .Where(t => t.IsActive)
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();
    }

    [HttpPost("generate")]
    public async Task<ActionResult<OnboardingTemplate>> GenerateTemplate([FromBody] GenerateTemplateRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Prompt))
        {
            return BadRequest("Prompt is required");
        }

        var template = await _aiService.GenerateTemplateAsync(request.Prompt);
        return Ok(template);
    }

    [HttpPost]
    public async Task<ActionResult<OnboardingTemplate>> CreateTemplate(CreateTemplateDto dto)
    {
        // Ensure tenant exists (MVP hack)
        var tenant = await _context.Tenants.FirstOrDefaultAsync();
        if (tenant == null) return BadRequest("No tenant found");

        var template = new OnboardingTemplate
        {
            Name = dto.Name,
            Description = dto.Description,
            IndustryType = dto.IndustryType,
            IsActive = dto.IsActive,
            TenantId = tenant.Id
        };

        foreach (var stageDto in dto.Stages)
        {
            var stage = new StageTemplate
            {
                Name = stageDto.Name,
                Description = stageDto.Description,
                Order = stageDto.Order,
                Template = template
            };

            foreach (var taskDto in stageDto.Tasks)
            {
                var task = new TaskTemplate
                {
                    Title = taskDto.Title,
                    Type = (OnboardAI.Domain.Enums.TaskType)taskDto.Type,
                    IsRequired = taskDto.IsRequired,
                    Order = taskDto.Order,
                    Stage = stage
                };
                stage.Tasks.Add(task);
            }
            template.Stages.Add(stage);
        }

        _context.OnboardingTemplates.Add(template);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTemplates), new { id = template.Id }, template);
    }
}

public class GenerateTemplateRequest
{
    public string Prompt { get; set; } = string.Empty;
}

public class CreateTemplateDto
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? IndustryType { get; set; }
    public bool IsActive { get; set; } = true;
    public List<CreateStageDto> Stages { get; set; } = new();
}

public class CreateStageDto
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int Order { get; set; }
    public List<CreateTaskDto> Tasks { get; set; } = new();
}

public class CreateTaskDto
{
    public string Title { get; set; } = string.Empty;
    public int Type { get; set; }
    public bool IsRequired { get; set; } = true;
    public int Order { get; set; }
}
