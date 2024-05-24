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
            migrationBuilder.DropForeignKey("FK_WorkSurfaceApps_OnboardedApps_OnboardedAppId", "WorkSurfaceApps");
            migrationBuilder.DropForeignKey("FK_WorkSurfaceApps_OnboardedContexts_OnboardedContextId", "WorkSurfaceApps");
            migrationBuilder.DropForeignKey("FK_WorkSurfaceApps_WorkSurfaces_WorkSurfaceId", "WorkSurfaceApps");

            migrationBuilder.DropForeignKey("FK_WorkSurfaceContextTypes_ContextTypes_ContextTypesId", "WorkSurfaceContextTypes");
            migrationBuilder.DropForeignKey("FK_WorkSurfaceContextTypes_WorkSurfaces_WorkSurfacesId", "WorkSurfaceContextTypes");

            migrationBuilder.DropPrimaryKey("PK_WorkSurfaces", "WorkSurfaces");
            migrationBuilder.RenameTable("WorkSurfaces", "dbo", "Portals", "dbo");
            migrationBuilder.AddPrimaryKey("PK_Portals", "Portals", "Id");


            migrationBuilder.DropPrimaryKey("PK_WorkSurfaceApps", "WorkSurfaceApps");
            migrationBuilder.RenameColumn("WorkSurfaceId", "WorkSurfaceApps", "PortalId");
            migrationBuilder.RenameTable("WorkSurfaceApps", "dbo", "PortalApps", "dbo");
            migrationBuilder.AddPrimaryKey("PK_PortalApps", "PortalApps", "Id");

            migrationBuilder.AddForeignKey("FK_PortalApps_OnboardedApps_OnboardedAppId",
                                            "PortalApps",
                                        "OnboardedAppId",
                                        "OnboardedApps",
                                        "dbo",
                                        "dbo",
                                        "Id",
                                        onDelete: ReferentialAction.Cascade);
           
            migrationBuilder.AddForeignKey("FK_PortalApps_OnboardedContexts_OnboardedContextId",
                                            "PortalApps",
                                            "OnboardedContextId",
                                            "OnboardedContexts", 
                                            "dbo",
                                            "dbo",
                                            "Id",
                                            onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey("FK_PortalApps_Portals_PortalId", 
                                            "PortalApps", 
                                            "PortalId", 
                                            "Portals", 
                                            "dbo", 
                                            "dbo",
                                            "Id", 
                                            onDelete: ReferentialAction.Restrict);

            migrationBuilder.DropPrimaryKey("PK_WorkSurfaceContextTypes", "WorkSurfaceContextTypes");

            migrationBuilder.RenameColumn("WorkSurfacesId", "WorkSurfaceContextTypes", "PortalsId");
            migrationBuilder.RenameTable("WorkSurfaceContextTypes", "dbo", "PortalContextTypes", "dbo");

            migrationBuilder.AddPrimaryKey("PK_PortalContextTypes", "PortalContextTypes", new string[] {"ContextTypesId", "PortalsId"});

            migrationBuilder.AddForeignKey("FK_PortalContextTypes_ContextTypes_ContextTypesId", 
                                        "PortalContextTypes", 
                                        "ContextTypesId", 
                                        "ContextTypes", 
                                        "dbo", 
                                        "dbo", 
                                        "Id", 
                                        onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey("FK_PortalContextTypes_Portals_PortalsId", 
                                            "PortalContextTypes", 
                                            "PortalsId", 
                                            "Portals", 
                                            "dbo", 
                                            "dbo", 
                                            "Id", 
                                            onDelete: ReferentialAction.Cascade);

            migrationBuilder.RenameIndex("IX_WorkSurfaceApps_OnboardedAppId", "IX_PortalApps_OnboardedAppId", "PortalApps");
            migrationBuilder.RenameIndex("IX_WorkSurfaceApps_OnboardedContextId", "IX_PortalApps_OnboardedContextId", "PortalApps");
            migrationBuilder.RenameIndex("IX_WorkSurfaceApps_WorkSurfaceId", "IX_PortalApps_PortalId", "PortalApps");

            migrationBuilder.RenameIndex("IX_WorkSurfaceContextTypes_WorkSurfacesId", "IX_PortalContextTypes_PortalsId", "PortalContextTypes");

            migrationBuilder.RenameIndex("IX_WorkSurfaces_Key", "IX_Portals_Key", "Portals");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey("FK_PortalApps_OnboardedApps_OnboardedAppId", "PortalApps");
            migrationBuilder.DropForeignKey("FK_PortalApps_OnboardedContexts_OnboardedContextId", "PortalApps");
            migrationBuilder.DropForeignKey("FK_PortalApps_Portals_PortalId", "PortalApps");

            migrationBuilder.DropForeignKey("FK_PortalContextTypes_ContextTypes_ContextTypesId", "PortalContextTypes");
            migrationBuilder.DropForeignKey("FK_PortalContextTypes_Portals_PortalsId", "PortalContextTypes");

            migrationBuilder.DropPrimaryKey("PK_Portals", "Portals");
            migrationBuilder.RenameTable("Portals", "dbo", "WorkSurfaces", "dbo");
            migrationBuilder.AddPrimaryKey("PK_WorkSurfaces", "WorkSurfaces", "Id");


            migrationBuilder.DropPrimaryKey("PK_PortalApps", "PortalApps");
            migrationBuilder.RenameColumn("PortalId", "PortalApps", "WorkSurfaceId");
            migrationBuilder.RenameTable("PortalApps", "dbo", "WorkSurfaceApps", "dbo");
            migrationBuilder.AddPrimaryKey("PK_WorkSurfaceApps", "WorkSurfaceApps", "Id");

            migrationBuilder.AddForeignKey("FK_WorkSurfaceApps_OnboardedApps_OnboardedAppId",
                                            "WorkSurfaceApps",
                                        "OnboardedAppId",
                                        "OnboardedApps",
                                        "dbo",
                                        "dbo",
                                        "Id",
                                        onDelete: ReferentialAction.Cascade
                                        );

            migrationBuilder.AddForeignKey("FK_WorkSurfaceApps_OnboardedContexts_OnboardedContextId",
                                            "WorkSurfaceApps",
                                            "OnboardedContextId",
                                            "OnboardedContexts",
                                            "dbo",
                                            "dbo",
                                            "Id",
                                            onDelete: ReferentialAction.Restrict);


            migrationBuilder.AddForeignKey("FK_WorkSurfaceApps_WorkSurfaces_WorkSurfaceId",
                                            "WorkSurfaceApps",
                                            "WorkSurfaceId",
                                            "WorkSurfaces",
                                            "dbo",
                                            "dbo",
                                            "Id",
                                            onDelete: ReferentialAction.Restrict);

            migrationBuilder.DropPrimaryKey("PK_PortalContextTypes", "PortalContextTypes");

            migrationBuilder.RenameColumn("PortalsId", "PortalContextTypes", "WorkSurfacesId");
            migrationBuilder.RenameTable("PortalContextTypes", "dbo", "WorkSurfaceContextTypes", "dbo");

            migrationBuilder.AddPrimaryKey("PK_WorkSurfaceContextTypes", "WorkSurfaceContextTypes", new string[] { "ContextTypesId", "WorkSurfacesId" });

            migrationBuilder.AddForeignKey("FK_WorkSurfaceContextTypes_ContextTypes_ContextTypesId",
                                        "WorkSurfaceContextTypes",
                                        "ContextTypesId",
                                        "ContextTypes",
                                        "dbo",
                                        "dbo",
                                        "Id",
                                        onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey("FK_WorkSurfaceContextTypes_WorkSurfaces_WorkSurfacesId",
                                            "WorkSurfaceContextTypes",
                                            "WorkSurfacesId",
                                            "WorkSurfaces",
                                            "dbo",
                                            "dbo",
                                            "Id",
                                            onDelete: ReferentialAction.Cascade);


            migrationBuilder.RenameIndex("IX_PortalApps_OnboardedAppId", "IX_WorkSurfaceApps_OnboardedAppId", "WorkSurfaceApps");
            migrationBuilder.RenameIndex("IX_PortalApps_OnboardedContextId", "IX_WorkSurfaceApps_OnboardedContextId", "WorkSurfaceApps");
            migrationBuilder.RenameIndex("IX_PortalApps_PortalId", "IX_WorkSurfaceApps_WorkSurfaceId", "WorkSurfaceApps");

            migrationBuilder.RenameIndex("IX_PortalContextTypes_PortalsId", "IX_WorkSurfaceContextTypes_WorkSurfacesId", "WorkSurfaceContextTypes");

            migrationBuilder.RenameIndex("IX_Portals_Key", "IX_WorkSurfaces_Key", "WorkSurfaces");

           
        }
    }
}
