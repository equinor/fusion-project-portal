#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

#Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
#For more information, please see https://aka.ms/containercompat

# CLIENT

FROM node:current-alpine as build-client

RUN ls

WORKDIR /app-client

COPY ["/client", "."]


#COPY ../../../client/ .

RUN yarn install --frozen-lockfile
RUN npx nx run portal-client:build


# BACKEND


FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["/clientBackend/src/Equinor.ProjectExecutionPortal.ClientBackend/Equinor.ProjectExecutionPortal.ClientBackend.csproj", "Equinor.ProjectExecutionPortal.ClientBackend/"]

COPY ["/clientBackend/src/Equinor.ProjectExecutionPortal.ClientBackend/nuget.config", "Equinor.ProjectExecutionPortal.ClientBackend/"]
RUN dotnet restore "Equinor.ProjectExecutionPortal.ClientBackend/Equinor.ProjectExecutionPortal.ClientBackend.csproj" --configfile Equinor.ProjectExecutionPortal.ClientBackend/nuget.config
COPY "/clientBackend/src/Equinor.ProjectExecutionPortal.ClientBackend/" "Equinor.ProjectExecutionPortal.ClientBackend/"
WORKDIR "/src/Equinor.ProjectExecutionPortal.ClientBackend"
RUN dotnet build "Equinor.ProjectExecutionPortal.ClientBackend.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Equinor.ProjectExecutionPortal.ClientBackend.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

COPY --from=build-client /app-client/dist/packages/portal-client /app-backend/wwwroot

ENTRYPOINT ["dotnet", "Equinor.ProjectExecutionPortal.ClientBackend.dll"]