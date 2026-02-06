# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Copy the entire src directory (needed for multi-project solution)
COPY src/ ./src/

# Restore dependencies
RUN dotnet restore src/OnboardAI.Api/OnboardAI.Api.csproj

# Build and publish
RUN dotnet publish src/OnboardAI.Api/OnboardAI.Api.csproj -c Release -o out

# Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-env /app/out .

# Use 8000 as it's a common default for many cloud providers
EXPOSE 8000
ENV ASPNETCORE_URLS=http://+:8000

ENTRYPOINT ["dotnet", "OnboardAI.Api.dll"]
