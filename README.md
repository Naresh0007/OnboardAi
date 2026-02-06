# OnboardAI 🚀

OnboardAI is a modern B2B Client Onboarding SaaS designed to automate and streamline the intake process for new clients. It uses AI to generate personalized onboarding checklists based on client profile data (industry, size, technical needs).

## 🌟 Key Features

- **Intelligent Intake**: Dynamic forms to capture client requirements.
- **AI-Generated Checklists**: Automatic creation of multi-stage onboarding plans.
- **Unified Dashboard**: Real-time progress tracking of active onboardings.
- **Risk Assessment**: Visual indicators for at-risk client setups.
- **Clean Architecture**: Built with a robust .NET backend and a reactive Next.js frontend.

## 🛠️ Project Structure

The project is organized as a monorepo containing:
- `/api`: The .NET 8/9 backend API (Onion Architecture).
- `/frontend`: The Next.js 16/17 (App Router) frontend.

## 🚀 Getting Started

### 1. Prerequisites
- [.NET 8 or 9 SDK](https://dotnet.microsoft.com/download)
- [Node.js (v18+)](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/download/)

### 2. Database Setup
Ensure PostgreSQL is running locally on port `5432`.
Navigate to the `frontend` folder and run:
```bash
npx prisma db push
npx prisma db seed
```

### 3. Run the Backend API
From the root directory:
```bash
dotnet run --project api/src/OnboardAI.Api/OnboardAI.Api.csproj
```
The API will be available at `http://localhost:5150/swagger`.

### 4. Run the Frontend
Navigate to the `frontend` directory:
```bash
npm install
npm run dev
```
The frontend will be available at `http://localhost:3000`.

## 🔐 Authentication
The application currently uses a **simulated authentication system** for demonstration purposes.
- **Admin Email**: `admin@onboardai.com`
- **Password**: Any password will work.

## 🎨 Tech Stack
- **Frontend**: React, Next.js, Tailwind CSS, Lucide Icons, Prisma.
- **Backend**: .NET, ASP.NET Core, Entity Framework Core.
- **Database**: PostgreSQL.

---
Built with ❤️ for rapid client success.
