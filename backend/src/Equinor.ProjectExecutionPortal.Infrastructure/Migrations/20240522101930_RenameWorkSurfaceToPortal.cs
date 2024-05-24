using System;
using System.Security.Cryptography.X509Certificates;
using Equinor.ProjectExecutionPortal.Domain.Entities;
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
            migrationBuilder.DropForeignKey(name: "FK_WorkSurfaceApps_OnboardedApps_OnboardedAppId", table: "WorkSurfaceApps");
            migrationBuilder.DropForeignKey(name: "FK_WorkSurfaceApps_OnboardedContexts_OnboardedContextId", table: "WorkSurfaceApps");
            migrationBuilder.DropForeignKey(name: "FK_WorkSurfaceApps_WorkSurfaces_WorkSurfaceId", table: "WorkSurfaceApps");

            migrationBuilder.DropForeignKey(name: "FK_WorkSurfaceContextTypes_ContextTypes_ContextTypesId", table: "WorkSurfaceContextTypes");
            migrationBuilder.DropForeignKey(name: "FK_WorkSurfaceContextTypes_WorkSurfaces_WorkSurfacesId", table: "WorkSurfaceContextTypes");

            migrationBuilder.DropPrimaryKey(name: "PK_WorkSurfaces", table: "WorkSurfaces");
            migrationBuilder.RenameTable(name: "WorkSurfaces", schema: "dbo", newName: "Portals", newSchema: "dbo");
            migrationBuilder.AddPrimaryKey(name: "PK_Portals", table: "Portals", column: "Id");


            migrationBuilder.DropPrimaryKey(name: "PK_WorkSurfaceApps", table: "WorkSurfaceApps");
            migrationBuilder.RenameColumn(name: "WorkSurfaceId", table: "WorkSurfaceApps", newName: "PortalId");
            migrationBuilder.RenameTable(name: "WorkSurfaceApps", schema: "dbo", newName: "PortalApps", newSchema: "dbo");
            migrationBuilder.AddPrimaryKey(name: "PK_PortalApps", table: "PortalApps", column: "Id");

            migrationBuilder.AddForeignKey(name: "FK_PortalApps_OnboardedApps_OnboardedAppId",
                                            table: "PortalApps",
                                            column: "OnboardedAppId",
                                            principalTable: "OnboardedApps",
                                            schema: "dbo",
                                            principalSchema: "dbo",
                                            principalColumn: "Id",
                                            onDelete: ReferentialAction.Cascade);
           
            migrationBuilder.AddForeignKey(name: "FK_PortalApps_OnboardedContexts_OnboardedContextId",
                                            table: "PortalApps",
                                            column: "OnboardedContextId",
                                            principalTable: "OnboardedContexts", 
                                            schema: "dbo",
                                            principalSchema: "dbo",
                                            principalColumn: "Id",
                                            onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(name: "FK_PortalApps_Portals_PortalId", 
                                            table: "PortalApps", 
                                            column: "PortalId", 
                                            principalTable: "Portals",
                                            schema: "dbo",
                                            principalSchema: "dbo",
                                            principalColumn: "Id", 
                                            onDelete: ReferentialAction.Restrict);

            migrationBuilder.DropPrimaryKey(name:"PK_WorkSurfaceContextTypes", table:"WorkSurfaceContextTypes");

            migrationBuilder.RenameColumn(name: "WorkSurfacesId", table: "WorkSurfaceContextTypes", newName: "PortalsId");
            migrationBuilder.RenameTable(name: "WorkSurfaceContextTypes", schema: "dbo", newName: "PortalContextTypes", newSchema: "dbo");

            migrationBuilder.AddPrimaryKey(name: "PK_PortalContextTypes", table: "PortalContextTypes", columns: new string[] { "ContextTypesId", "PortalsId" });

            migrationBuilder.AddForeignKey(name: "FK_PortalContextTypes_ContextTypes_ContextTypesId", 
                                            table: "PortalContextTypes", 
                                            column: "ContextTypesId", 
                                            principalTable: "ContextTypes", 
                                            schema: "dbo", 
                                            principalSchema: "dbo", 
                                            principalColumn: "Id", 
                                            onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(name: "FK_PortalContextTypes_Portals_PortalsId", 
                                            table: "PortalContextTypes", 
                                            column: "PortalsId", 
                                            principalTable: "Portals", 
                                            schema: "dbo", 
                                            principalSchema: "dbo", 
                                            principalColumn: "Id", 
                                            onDelete: ReferentialAction.Cascade);

            migrationBuilder.RenameIndex(name: "IX_WorkSurfaceApps_OnboardedAppId", newName: "IX_PortalApps_OnboardedAppId", table: "PortalApps");
            migrationBuilder.RenameIndex(name: "IX_WorkSurfaceApps_OnboardedContextId", newName: "IX_PortalApps_OnboardedContextId", table: "PortalApps");
            migrationBuilder.RenameIndex(name: "IX_WorkSurfaceApps_WorkSurfaceId", newName: "IX_PortalApps_PortalId", table: "PortalApps");

            migrationBuilder.RenameIndex(name: "IX_WorkSurfaceContextTypes_WorkSurfacesId", newName: "IX_PortalContextTypes_PortalsId", table: "PortalContextTypes");

            migrationBuilder.RenameIndex(name: "IX_WorkSurfaces_Key", newName: "IX_Portals_Key", table: "Portals");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_PortalApps_OnboardedApps_OnboardedAppId", table: "PortalApps");
            migrationBuilder.DropForeignKey(name: "FK_PortalApps_OnboardedContexts_OnboardedContextId", table: "PortalApps");
            migrationBuilder.DropForeignKey(name: "FK_PortalApps_Portals_PortalId", table: "PortalApps");

            migrationBuilder.DropForeignKey(name: "FK_PortalContextTypes_ContextTypes_ContextTypesId", table: "PortalContextTypes");
            migrationBuilder.DropForeignKey(name: "FK_PortalContextTypes_Portals_PortalsId", table: "PortalContextTypes");

            migrationBuilder.DropPrimaryKey(name: "PK_Portals", table: "Portals");
            migrationBuilder.RenameTable(name: "Portals", schema: "dbo", newName: "WorkSurfaces", newSchema: "dbo");
            migrationBuilder.AddPrimaryKey(name: "PK_WorkSurfaces", table: "WorkSurfaces", column: "Id");


            migrationBuilder.DropPrimaryKey(name: "PK_PortalApps", table: "PortalApps");
            migrationBuilder.RenameColumn(name:"PortalId", table:"PortalApps", newName:"WorkSurfaceId");
            migrationBuilder.RenameTable(name:"PortalApps", schema:"dbo", newName:"WorkSurfaceApps", newSchema:"dbo");
            migrationBuilder.AddPrimaryKey(name:"PK_WorkSurfaceApps", table:"WorkSurfaceApps", column:"Id");

            migrationBuilder.AddForeignKey(name: "FK_WorkSurfaceApps_OnboardedApps_OnboardedAppId",
                                            table: "WorkSurfaceApps",
                                            column: "OnboardedAppId",
                                            principalTable: "OnboardedApps",
                                            schema: "dbo",
                                            principalSchema: "dbo",
                                            principalColumn: "Id",
                                            onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(name: "FK_WorkSurfaceApps_OnboardedContexts_OnboardedContextId",
                                            table: "WorkSurfaceApps",
                                            column: "OnboardedContextId",
                                            principalTable: "OnboardedContexts",
                                            schema: "dbo",
                                            principalSchema: "dbo",
                                            principalColumn: "Id",
                                            onDelete: ReferentialAction.Restrict);


            migrationBuilder.AddForeignKey(name: "FK_WorkSurfaceApps_WorkSurfaces_WorkSurfaceId",
                                            table: "WorkSurfaceApps",
                                            column: "WorkSurfaceId",
                                            principalTable: "WorkSurfaces",
                                            schema: "dbo",
                                            principalSchema: "dbo",
                                            principalColumn: "Id",
                                            onDelete: ReferentialAction.Restrict);

            migrationBuilder.DropPrimaryKey(name: "PK_PortalContextTypes", table: "PortalContextTypes");

            migrationBuilder.RenameColumn(name: "PortalsId", table:"PortalContextTypes", newName: "WorkSurfacesId");
            migrationBuilder.RenameTable(name: "PortalContextTypes", schema: "dbo", newName: "WorkSurfaceContextTypes", newSchema: "dbo");

            migrationBuilder.AddPrimaryKey(name: "PK_WorkSurfaceContextTypes", table:"WorkSurfaceContextTypes", columns: new string[] { "ContextTypesId", "WorkSurfacesId" });

            migrationBuilder.AddForeignKey(name: "FK_WorkSurfaceContextTypes_ContextTypes_ContextTypesId",
                                            table: "WorkSurfaceContextTypes",
                                            column: "ContextTypesId",
                                            principalTable: "ContextTypes",
                                            schema: "dbo",
                                            principalSchema: "dbo",
                                            principalColumn: "Id",
                                            onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(name: "FK_WorkSurfaceContextTypes_WorkSurfaces_WorkSurfacesId",
                                            table: "WorkSurfaceContextTypes",
                                            column: "WorkSurfacesId",
                                            principalTable: "WorkSurfaces",
                                            schema: "dbo",
                                            principalSchema: "dbo",
                                            principalColumn: "Id",
                                            onDelete: ReferentialAction.Cascade);


            migrationBuilder.RenameIndex(name: "IX_PortalApps_OnboardedAppId", newName: "IX_WorkSurfaceApps_OnboardedAppId", table: "WorkSurfaceApps");
            migrationBuilder.RenameIndex(name:"IX_PortalApps_OnboardedContextId", newName: "IX_WorkSurfaceApps_OnboardedContextId", table: "WorkSurfaceApps");
            migrationBuilder.RenameIndex(name: "IX_PortalApps_PortalId", newName: "IX_WorkSurfaceApps_WorkSurfaceId", table: "WorkSurfaceApps");

            migrationBuilder.RenameIndex(name:"IX_PortalContextTypes_PortalsId", newName: "IX_WorkSurfaceContextTypes_WorkSurfacesId", table: "WorkSurfaceContextTypes");

            migrationBuilder.RenameIndex(name: "IX_Portals_Key", newName: "IX_WorkSurfaces_Key", table: "WorkSurfaces");

           
        }
    }
}
