using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Equinor.ProjectExecutionPortal.Infrastructure.Migrations
{
    public partial class WorkSurfaceAppsShouldReferToOnboardedApp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AppKey",
                table: "WorkSurfaceApplications");

            migrationBuilder.AddColumn<Guid>(
                name: "OnboardedAppId",
                table: "WorkSurfaceApplications",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_WorkSurfaceApplications_OnboardedAppId",
                table: "WorkSurfaceApplications",
                column: "OnboardedAppId");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkSurfaceApplications_OnboardedApps_OnboardedAppId",
                table: "WorkSurfaceApplications",
                column: "OnboardedAppId",
                principalTable: "OnboardedApps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkSurfaceApplications_OnboardedApps_OnboardedAppId",
                table: "WorkSurfaceApplications");

            migrationBuilder.DropIndex(
                name: "IX_WorkSurfaceApplications_OnboardedAppId",
                table: "WorkSurfaceApplications");

            migrationBuilder.DropColumn(
                name: "OnboardedAppId",
                table: "WorkSurfaceApplications");

            migrationBuilder.AddColumn<string>(
                name: "AppKey",
                table: "WorkSurfaceApplications",
                type: "nvarchar(400)",
                maxLength: 400,
                nullable: false,
                defaultValue: "");
        }
    }
}
