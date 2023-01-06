using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Equinor.ProjectExecutionPortal.Infrastructure.Migrations
{
    public partial class MoveAppGroupsOutOfWorkSurface : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkSurfaceApps_WorkSurfaceAppGroups_AppGroupId",
                table: "WorkSurfaceApps");

            migrationBuilder.DropTable(
                name: "WorkSurfaceAppGroups");

            migrationBuilder.DropIndex(
                name: "IX_WorkSurfaceApps_AppGroupId",
                table: "WorkSurfaceApps");

            migrationBuilder.DropColumn(
                name: "AppGroupId",
                table: "WorkSurfaceApps");

            migrationBuilder.DropColumn(
                name: "Order",
                table: "WorkSurfaceApps");

            migrationBuilder.AddColumn<Guid>(
                name: "AppGroupId",
                table: "OnboardedApps",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "OnboardedApps",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "AppGroups",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Order = table.Column<int>(type: "int", nullable: false),
                    AccentColor = table.Column<string>(type: "nvarchar(7)", maxLength: 7, nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedByAzureOid = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ModifiedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedByAzureOid = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppGroups", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OnboardedApps_AppGroupId",
                table: "OnboardedApps",
                column: "AppGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_OnboardedApps_AppGroups_AppGroupId",
                table: "OnboardedApps",
                column: "AppGroupId",
                principalTable: "AppGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OnboardedApps_AppGroups_AppGroupId",
                table: "OnboardedApps");

            migrationBuilder.DropTable(
                name: "AppGroups");

            migrationBuilder.DropIndex(
                name: "IX_OnboardedApps_AppGroupId",
                table: "OnboardedApps");

            migrationBuilder.DropColumn(
                name: "AppGroupId",
                table: "OnboardedApps");

            migrationBuilder.DropColumn(
                name: "Order",
                table: "OnboardedApps");

            migrationBuilder.AddColumn<Guid>(
                name: "AppGroupId",
                table: "WorkSurfaceApps",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "WorkSurfaceApps",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "WorkSurfaceAppGroups",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    WorkSurfaceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AccentColor = table.Column<string>(type: "nvarchar(7)", maxLength: 7, nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedByAzureOid = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ModifiedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedByAzureOid = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Order = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkSurfaceAppGroups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkSurfaceAppGroups_WorkSurfaces_WorkSurfaceId",
                        column: x => x.WorkSurfaceId,
                        principalTable: "WorkSurfaces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WorkSurfaceApps_AppGroupId",
                table: "WorkSurfaceApps",
                column: "AppGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkSurfaceAppGroups_WorkSurfaceId",
                table: "WorkSurfaceAppGroups",
                column: "WorkSurfaceId");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkSurfaceApps_WorkSurfaceAppGroups_AppGroupId",
                table: "WorkSurfaceApps",
                column: "AppGroupId",
                principalTable: "WorkSurfaceAppGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
