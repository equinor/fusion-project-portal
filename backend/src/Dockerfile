FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine3.16 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine3.16 AS build
WORKDIR /src
COPY ["Equinor.ProjectExecutionPortal.WebApi/Equinor.ProjectExecutionPortal.WebApi.csproj", "Equinor.ProjectExecutionPortal.WebApi/"]
COPY ["/nuget.config", "/"]
RUN dotnet restore "Equinor.ProjectExecutionPortal.WebApi/Equinor.ProjectExecutionPortal.WebApi.csproj" --configfile /nuget.config
COPY . .
WORKDIR "/src/Equinor.ProjectExecutionPortal.WebApi"
RUN dotnet build "Equinor.ProjectExecutionPortal.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Equinor.ProjectExecutionPortal.WebApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

RUN adduser \
    --uid 1001 \
    --home /app \
    --gecos '' app \
    --disabled-password \
    && chown -R app /app

USER 1001

ENTRYPOINT ["dotnet", "Equinor.ProjectExecutionPortal.WebApi.dll"]