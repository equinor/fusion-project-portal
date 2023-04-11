using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Equinor.ProjectExecutionPortal.Infrastructure.Migrations
{
    public partial class AddOnboardedContext : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "OnboardedContextId",
                table: "WorkSurfaceApps",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "OnboardedContext",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ExternalId = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Type = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Title = table.Column<string>(type: "nvarchar(400)", maxLength: 400, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedByAzureOid = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ModifiedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedByAzureOid = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OnboardedContext", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WorkSurfaceApps_OnboardedContextId",
                table: "WorkSurfaceApps",
                column: "OnboardedContextId");

            migrationBuilder.CreateIndex(
                name: "IX_OnboardedContext_ExternalId",
                table: "OnboardedContext",
                column: "ExternalId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkSurfaceApps_OnboardedContext_OnboardedContextId",
                table: "WorkSurfaceApps",
                column: "OnboardedContextId",
                principalTable: "OnboardedContext",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkSurfaceApps_OnboardedContext_OnboardedContextId",
                table: "WorkSurfaceApps");

            migrationBuilder.DropTable(
                name: "OnboardedContext");

            migrationBuilder.DropIndex(
                name: "IX_WorkSurfaceApps_OnboardedContextId",
                table: "WorkSurfaceApps");

            migrationBuilder.DropColumn(
                name: "OnboardedContextId",
                table: "WorkSurfaceApps");
        }
    }
}
