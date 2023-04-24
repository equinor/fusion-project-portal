# 1: Generate the client javascript bundle 
# ----------------------------------------------------

FROM node:current-alpine as build-client

RUN ls

WORKDIR /app-client

COPY ["/client", "."]

RUN yarn install --frozen-lockfile
RUN npx nx run portal-client:build

# 2: Build & run web server
# ----------------------------------------------------

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-backend
WORKDIR /src

# Copy config files
COPY ["/clientBackend/src/Equinor.ProjectExecutionPortal.ClientBackend/Equinor.ProjectExecutionPortal.ClientBackend.csproj", "Equinor.ProjectExecutionPortal.ClientBackend/"]
COPY ["/clientBackend/src/nuget.config", "Equinor.ProjectExecutionPortal.ClientBackend/"]

# Copy the client bundle to the backend
COPY --from=build-client /app-client/dist/packages/portal-client/assets Equinor.ProjectExecutionPortal.ClientBackend/wwwroot/ClientApp/production/assets
COPY --from=build-client /app-client/dist/packages/portal-client/portal-client-bundle.js Equinor.ProjectExecutionPortal.ClientBackend/wwwroot/ClientApp/production/portal-client-bundle.js

RUN dotnet restore "Equinor.ProjectExecutionPortal.ClientBackend/Equinor.ProjectExecutionPortal.ClientBackend.csproj" --configfile Equinor.ProjectExecutionPortal.ClientBackend/nuget.config

# Copy the rest
COPY "/clientBackend/src/Equinor.ProjectExecutionPortal.ClientBackend/" "Equinor.ProjectExecutionPortal.ClientBackend/"

WORKDIR "/src/Equinor.ProjectExecutionPortal.ClientBackend"

# Build and publish
RUN dotnet build "Equinor.ProjectExecutionPortal.ClientBackend.csproj" -c Release -o /app/build-backend

FROM build-backend AS publish
RUN dotnet publish "Equinor.ProjectExecutionPortal.ClientBackend.csproj" -c Release -o /app/publish

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

ENTRYPOINT ["dotnet", "Equinor.ProjectExecutionPortal.ClientBackend.dll"]