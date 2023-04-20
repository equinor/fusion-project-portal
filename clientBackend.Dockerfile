# Generate client bundle

FROM node:current-alpine as build-client

RUN ls

WORKDIR /app-client

COPY ["/client", "."]

RUN yarn install --frozen-lockfile
RUN npx nx run portal-client:build

# Build & run backend server

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-backend
WORKDIR /src
COPY ["/clientBackend/src/Equinor.ProjectExecutionPortal.ClientBackend/Equinor.ProjectExecutionPortal.ClientBackend.csproj", "Equinor.ProjectExecutionPortal.ClientBackend/"]

COPY ["/clientBackend/src/nuget.config", "Equinor.ProjectExecutionPortal.ClientBackend/"]
RUN dotnet restore "Equinor.ProjectExecutionPortal.ClientBackend/Equinor.ProjectExecutionPortal.ClientBackend.csproj" --configfile Equinor.ProjectExecutionPortal.ClientBackend/nuget.config
COPY "/clientBackend/src/Equinor.ProjectExecutionPortal.ClientBackend/" "Equinor.ProjectExecutionPortal.ClientBackend/"
WORKDIR "/src/Equinor.ProjectExecutionPortal.ClientBackend"

# Copy the client bundle to the backend
COPY --from=build-client /app-client/dist/packages/portal-client /wwwroot/ClientApp/production

RUN dotnet build "Equinor.ProjectExecutionPortal.ClientBackend.csproj" -c Release -o /app/build-backend

FROM build-backend AS publish
RUN dotnet publish "Equinor.ProjectExecutionPortal.ClientBackend.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Copy the client bundle to the backend
#COPY --from=build-client /app-client/dist/packages/portal-client /app-backend/wwwroot/ClientApp/production

RUN adduser \
    --uid 1001 \
    --home /app \
    --gecos '' app \
    --disabled-password \
    && chown -R app /app

USER 1001

ENTRYPOINT ["dotnet", "Equinor.ProjectExecutionPortal.ClientBackend.dll"]