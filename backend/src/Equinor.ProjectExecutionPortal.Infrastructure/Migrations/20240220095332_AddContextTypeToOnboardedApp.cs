using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Equinor.ProjectExecutionPortal.Infrastructure.Migrations
{
    public partial class AddContextTypeToOnboardedApp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OnboardedAppContextTypes",
                columns: table => new
                {
                    ContextTypesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OnboardedAppsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OnboardedAppContextTypes", x => new { x.ContextTypesId, x.OnboardedAppsId });
                    table.ForeignKey(
                        name: "FK_OnboardedAppContextTypes_ContextTypes_ContextTypesId",
                        column: x => x.ContextTypesId,
                        principalTable: "ContextTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OnboardedAppContextTypes_OnboardedApps_OnboardedAppsId",
                        column: x => x.OnboardedAppsId,
                        principalTable: "OnboardedApps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OnboardedAppContextTypes_OnboardedAppsId",
                table: "OnboardedAppContextTypes",
                column: "OnboardedAppsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OnboardedAppContextTypes");
        }
    }
}
