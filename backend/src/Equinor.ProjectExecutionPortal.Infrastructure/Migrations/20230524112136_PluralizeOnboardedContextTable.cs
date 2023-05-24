using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Equinor.ProjectExecutionPortal.Infrastructure.Migrations
{
    public partial class PluralizeOnboardedContextTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkSurfaceApps_OnboardedContext_OnboardedContextId",
                table: "WorkSurfaceApps");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OnboardedContext",
                table: "OnboardedContext");

            migrationBuilder.RenameTable(
                name: "OnboardedContext",
                newName: "OnboardedContexts");

            migrationBuilder.RenameIndex(
                name: "IX_OnboardedContext_ExternalId",
                table: "OnboardedContexts",
                newName: "IX_OnboardedContexts_ExternalId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OnboardedContexts",
                table: "OnboardedContexts",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkSurfaceApps_OnboardedContexts_OnboardedContextId",
                table: "WorkSurfaceApps",
                column: "OnboardedContextId",
                principalTable: "OnboardedContexts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkSurfaceApps_OnboardedContexts_OnboardedContextId",
                table: "WorkSurfaceApps");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OnboardedContexts",
                table: "OnboardedContexts");

            migrationBuilder.RenameTable(
                name: "OnboardedContexts",
                newName: "OnboardedContext");

            migrationBuilder.RenameIndex(
                name: "IX_OnboardedContexts_ExternalId",
                table: "OnboardedContext",
                newName: "IX_OnboardedContext_ExternalId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OnboardedContext",
                table: "OnboardedContext",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkSurfaceApps_OnboardedContext_OnboardedContextId",
                table: "WorkSurfaceApps",
                column: "OnboardedContextId",
                principalTable: "OnboardedContext",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
