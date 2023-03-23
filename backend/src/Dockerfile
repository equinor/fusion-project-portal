FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Equinor.ProjectExecutionPortal.WebApi/Equinor.ProjectExecutionPortal.WebApi.csproj", "Equinor.ProjectExecutionPortal.WebApi/"]
COPY ["Equinor.ProjectExecutionPortal.WebApi/nuget.config", "Equinor.ProjectExecutionPortal.WebApi/"]
RUN dotnet restore "Equinor.ProjectExecutionPortal.WebApi/Equinor.ProjectExecutionPortal.WebApi.csproj" --configfile Equinor.ProjectExecutionPortal.WebApi/nuget.config
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







#FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
#WORKDIR /src
#
## Copy project files separately and restore NuGet packages to create layers. Skip test projects!
#COPY Equinor.ProjectExecutionPortal.Domain/*.csproj ./Equinor.ProjectExecutionPortal.Domain/
#COPY Equinor.ProjectExecutionPortal.Infrastructure/*.csproj ./Equinor.ProjectExecutionPortal.Infrastructure/
#COPY Equinor.ProjectExecutionPortal.Application/*.csproj ./Equinor.ProjectExecutionPortal.Application/
#COPY Equinor.ProjectExecutionPortal.FusionPortalApi/*.csproj ./Equinor.ProjectExecutionPortal.FusionPortalApi/
#COPY Equinor.ProjectExecutionPortal.WebApi/*.csproj ./Equinor.ProjectExecutionPortal.WebApi/
#
## Copy full solution
#COPY . .
#
## Set workdir where main project is
#WORKDIR "/src/Equinor.ProjectExecutionPortal.WebApi"
#
## Build
#ENV DOTNET_SYSTEM_NET_HTTP_USESOCKETSHTTPHANDLER=0
#RUN dotnet build "Equinor.ProjectExecutionPortal.WebApi.csproj" -c Release -o /app/build
#
## Publish the application
#FROM build AS publish
#WORKDIR "/src/Equinor.ProjectExecutionPortal.WebApi"
#RUN dotnet publish "Equinor.ProjectExecutionPortal.WebApi.csproj" -c Release --no-restore -o /app/publish
#
## Define the image used for the final result
#FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
#
## Create non-root user. Set ui to 9999 to avoid conflicts with host OS just in case
#RUN adduser --disabled-password --uid 9999 --gecos "" apprunner
#
## Create the folder and set the non-root as owner
#RUN mkdir /app && chown apprunner.apprunner /app
#
## Change the user from root to non-root- From now on, all Docker commands are run as non-root user (except for COPY)
#USER apprunner
#
## Set the port to 5000 since the default production port is 80 and on-root users cannot bind to this port
#ENV ASPNETCORE_URLS http://+:5000
#EXPOSE 5000
#WORKDIR /app
#
## Copy the published files from the build image into this one
## Copy defaults to copying files as root, specify the user that should be the owner
#COPY --chown=apprunner:apprunner --from=publish /app/publish .
#ENTRYPOINT ["dotnet", "Equinor.ProjectExecutionPortal.WebApi.dll"]