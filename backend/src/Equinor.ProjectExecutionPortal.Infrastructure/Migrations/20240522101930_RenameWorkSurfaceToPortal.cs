using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Equinor.ProjectExecutionPortal.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RenameWorkSurfaceToPortal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropTable(
            //    name: "WorkSurfaceApps");

            //migrationBuilder.DropTable(
            //    name: "WorkSurfaceContextTypes");

            //migrationBuilder.DropTable(
            //    name: "WorkSurfaces");

            //migrationBuilder.CreateTable(
            //    name: "Portals",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        Key = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
            //        Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
            //        ShortName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
            //        SubText = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
            //        Description = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
            //        Order = table.Column<int>(type: "int", nullable: false),
            //        Icon = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        IsDefault = table.Column<bool>(type: "bit", nullable: false),
            //        CreatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
            //        CreatedByAzureOid = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
            //        ModifiedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
            //        ModifiedByAzureOid = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Portals", x => x.Id);
            //    });

            migrationBuilder.RenameColumn("WorkSurfaceId", "WorkSurfaceApps", "PortalId");
            migrationBuilder.RenameTable("WorkSurfaceApps", "dbo", "PortalApps", "dbo");

            migrationBuilder.RenameColumn("WorkSurfacesId", "WorkSurfaceContextTypes", "PortalsId");
            migrationBuilder.RenameTable("WorkSurfaceContextTypes", "dbo", "PortalContextTypes", "dbo");

            migrationBuilder.RenameTable("WorkSurfaces", "dbo", "Portals", "dbo");
            


            //migrationBuilder.CreateTable(
            //    name: "PortalApps",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        IsHidden = table.Column<bool>(type: "bit", nullable: false),
            //        OnboardedAppId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        PortalId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        OnboardedContextId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
            //        CreatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
            //        CreatedByAzureOid = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
            //        ModifiedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
            //        ModifiedByAzureOid = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_PortalApps", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_PortalApps_OnboardedApps_OnboardedAppId",
            //            column: x => x.OnboardedAppId,
            //            principalTable: "OnboardedApps",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_PortalApps_OnboardedContexts_OnboardedContextId",
            //            column: x => x.OnboardedContextId,
            //            principalTable: "OnboardedContexts",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Restrict);
            //        table.ForeignKey(
            //            name: "FK_PortalApps_Portals_PortalId",
            //            column: x => x.PortalId,
            //            principalTable: "Portals",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Restrict);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "PortalContextTypes",
            //    columns: table => new
            //    {
            //        ContextTypesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        PortalsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_PortalContextTypes", x => new { x.ContextTypesId, x.PortalsId });
            //        table.ForeignKey(
            //            name: "FK_PortalContextTypes_ContextTypes_ContextTypesId",
            //            column: x => x.ContextTypesId,
            //            principalTable: "ContextTypes",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_PortalContextTypes_Portals_PortalsId",
            //            column: x => x.PortalsId,
            //            principalTable: "Portals",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateIndex(
            //    name: "IX_PortalApps_OnboardedAppId",
            //    table: "PortalApps",
            //    column: "OnboardedAppId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_PortalApps_OnboardedContextId",
            //    table: "PortalApps",
            //    column: "OnboardedContextId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_PortalApps_PortalId",
            //    table: "PortalApps",
            //    column: "PortalId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_PortalContextTypes_PortalsId",
            //    table: "PortalContextTypes",
            //    column: "PortalsId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Portals_Key",
            //    table: "Portals",
            //    column: "Key",
            //    unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn("PortalId", "PortalApps", "WorkSurfaceId");
            migrationBuilder.RenameTable("PortalApps", "dbo", "WorkSurfaceApps", "dbo");

            migrationBuilder.RenameColumn("PortalsId", "PortalContextTypes", "WorkSurfacesId");
            migrationBuilder.RenameTable("PortalContextTypes", "dbo", "WorkSurfaceContextTypes", "dbo");

            migrationBuilder.RenameTable("Portals", "dbo", "WorkSurfaces", "dbo");
            //migrationBuilder.DropTable(
            //    name: "PortalApps");

            //migrationBuilder.DropTable(
            //    name: "PortalContextTypes");

            //migrationBuilder.DropTable(
            //    name: "Portals");

            //migrationBuilder.CreateTable(
            //    name: "WorkSurfaces",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        CreatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
            //        CreatedByAzureOid = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
            //        Description = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
            //        Icon = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        IsDefault = table.Column<bool>(type: "bit", nullable: false),
            //        Key = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
            //        ModifiedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
            //        ModifiedByAzureOid = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
            //        Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
            //        Order = table.Column<int>(type: "int", nullable: false),
            //        ShortName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
            //        SubText = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_WorkSurfaces", x => x.Id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "WorkSurfaceApps",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        OnboardedAppId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        OnboardedContextId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
            //        WorkSurfaceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        CreatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
            //        CreatedByAzureOid = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
            //        IsHidden = table.Column<bool>(type: "bit", nullable: false),
            //        ModifiedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
            //        ModifiedByAzureOid = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_WorkSurfaceApps", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_WorkSurfaceApps_OnboardedApps_OnboardedAppId",
            //            column: x => x.OnboardedAppId,
            //            principalTable: "OnboardedApps",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_WorkSurfaceApps_OnboardedContexts_OnboardedContextId",
            //            column: x => x.OnboardedContextId,
            //            principalTable: "OnboardedContexts",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Restrict);
            //        table.ForeignKey(
            //            name: "FK_WorkSurfaceApps_WorkSurfaces_WorkSurfaceId",
            //            column: x => x.WorkSurfaceId,
            //            principalTable: "WorkSurfaces",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Restrict);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "WorkSurfaceContextTypes",
            //    columns: table => new
            //    {
            //        ContextTypesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        WorkSurfacesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_WorkSurfaceContextTypes", x => new { x.ContextTypesId, x.WorkSurfacesId });
            //        table.ForeignKey(
            //            name: "FK_WorkSurfaceContextTypes_ContextTypes_ContextTypesId",
            //            column: x => x.ContextTypesId,
            //            principalTable: "ContextTypes",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_WorkSurfaceContextTypes_WorkSurfaces_WorkSurfacesId",
            //            column: x => x.WorkSurfacesId,
            //            principalTable: "WorkSurfaces",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateIndex(
            //    name: "IX_WorkSurfaceApps_OnboardedAppId",
            //    table: "WorkSurfaceApps",
            //    column: "OnboardedAppId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_WorkSurfaceApps_OnboardedContextId",
            //    table: "WorkSurfaceApps",
            //    column: "OnboardedContextId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_WorkSurfaceApps_WorkSurfaceId",
            //    table: "WorkSurfaceApps",
            //    column: "WorkSurfaceId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_WorkSurfaceContextTypes_WorkSurfacesId",
            //    table: "WorkSurfaceContextTypes",
            //    column: "WorkSurfacesId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_WorkSurfaces_Key",
            //    table: "WorkSurfaces",
            //    column: "Key",
            //    unique: true);
        }
    }
}
