namespace OnboardAI.Domain.Enums;

public enum UserRole
{
    Admin = 0,
    Member = 1,
    Client = 2
}

public enum OnboardingStatus
{
    NotStarted = 0,
    InProgress = 1,
    Blocked = 2,
    Completed = 3,
    Cancelled = 4
}

public enum StageStatus
{
    Pending = 0,
    Active = 1,
    Completed = 2,
    Skipped = 3
}

public enum TaskStatus
{
    Pending = 0,
    InProgress = 1,
    AwaitingReview = 2,
    Completed = 3,
    Skipped = 4
}

public enum TaskType
{
    Action = 0,
    Document = 1,
    Form = 2,
    ESign = 3,
    Review = 4,
    Meeting = 5
}

public enum DocumentStatus
{
    Uploaded = 0,
    PendingReview = 1,
    Approved = 2,
    Rejected = 3,
    Signed = 4
}

public enum RiskLevel
{
    Low = 0,
    Medium = 1,
    High = 2,
    Critical = 3
}

public enum InvitationStatus
{
    Pending = 0,
    Accepted = 1,
    Expired = 2
}
