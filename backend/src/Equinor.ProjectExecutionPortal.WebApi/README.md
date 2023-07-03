# 🧮 Fusion Project Portal

An application for managing projects.

## Table of Contents

1. [Getting started](#getting-started)
2. [Technical](#technical)
3. [Troubleshooting](#troubleshooting)

## Getting started

1. For development, a local database is preferred, but you can also use a remote service.
   1. You don't have to create a new database manually. Just add the connection string with your local server and run the database update command. The database will be created for you.
2. Add user secrets to the project. See `appSetttings.json` for schema.
   1. You will need to set up `secrets.json` to reflet the whole `appSettings.json`.
   2. Add your database connection string

### Nuget Feeds

Some Fusion specific packages is only available on the Fusion nuget feed and must be referenced.

For more info: https://statoil-proview.visualstudio.com/Fusion%20-%20Packages/_artifacts/feed/Fusion-Public/connect

Make sure you have the following feeds:

- Nuget feed: https://api.nuget.org/v3/index.json
- Fusion-Public feed:https://statoil-proview.pkgs.visualstudio.com/5309109e-a734-4064-a84c-fbce45336913/_packaging/Fusion-Public/nuget/v3/index.json

## Technical

### Database & migrations

The project uses Entity Framework Core to manage the database.

To run the commands below, ensure that you have the EF Core CLI installed globally: https://docs.microsoft.com/en-us/ef/core/cli/dotnet

#### Adding a migration

`dotnet ef migrations add "MigrationTitle" --project Equinor.ProjectExecutionPortal.Infrastructure --startup-project Equinor.ProjectExecutionPortal.WebApi --output-dir Migrations`

#### Update the database

`dotnet ef database update --project Equinor.ProjectExecutionPortal.Infrastructure --startup-project Equinor.ProjectExecutionPortal.WebApi`


## Troubleshooting

### "A connection was successfully established with the server, but then an error occurred during the login process. (provider: SSL Provider, error: 0 - The certificate chain was issued by an authority that is not trusted.)"

Please make sure your database connection string is trusted. 
