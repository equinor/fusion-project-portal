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
   1. Azure AppConfiguration is configed by default. You will have to specify AppConfig connection string to use it. Otherwise you will need to set up `secrets.json` to reflet the whole `appSettings.json`.
   2. Add your database connection string


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
