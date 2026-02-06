using Microsoft.EntityFrameworkCore;
using OnboardAI.Domain.Entities;

namespace OnboardAI.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Tenant> Tenants => Set<Tenant>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Client> Clients => Set<Client>();
    public DbSet<ClientUser> ClientUsers => Set<ClientUser>();
    public DbSet<OnboardingTemplate> OnboardingTemplates => Set<OnboardingTemplate>();
    public DbSet<StageTemplate> StageTemplates => Set<StageTemplate>();
    public DbSet<TaskTemplate> TaskTemplates => Set<TaskTemplate>();
    public DbSet<Onboarding> Onboardings => Set<Onboarding>();
    public DbSet<StageInstance> StageInstances => Set<StageInstance>();
    public DbSet<Task> Tasks => Set<Task>();
    public DbSet<Document> Documents => Set<Document>();
    public DbSet<Comment> Comments => Set<Comment>();
    public DbSet<RiskScore> RiskScores => Set<RiskScore>();
    public DbSet<ActivityLog> ActivityLogs => Set<ActivityLog>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure relationships and naming to match Prisma as much as possible
        modelBuilder.Entity<Tenant>().ToTable("tenants");
        modelBuilder.Entity<User>().ToTable("users");
        modelBuilder.Entity<Client>().ToTable("clients");
        modelBuilder.Entity<ClientUser>().ToTable("client_users");
        modelBuilder.Entity<OnboardingTemplate>().ToTable("onboarding_templates");
        modelBuilder.Entity<StageTemplate>().ToTable("stage_templates");
        modelBuilder.Entity<TaskTemplate>().ToTable("task_templates");
        modelBuilder.Entity<Onboarding>().ToTable("onboardings");
        modelBuilder.Entity<StageInstance>().ToTable("stage_instances");
        modelBuilder.Entity<Task>().ToTable("tasks");
        modelBuilder.Entity<Document>().ToTable("documents");
        modelBuilder.Entity<Comment>().ToTable("comments");
        modelBuilder.Entity<RiskScore>().ToTable("risk_scores");
        modelBuilder.Entity<ActivityLog>().ToTable("activity_logs");
    }
}
