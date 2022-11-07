using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Equinor.ProjectExecutionPortal.Infrastructure.Migrations
{
    public partial class RenameApplicationsToApps : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WorkSurfaceApplications");

            migrationBuilder.CreateTable(
                name: "WorkSurfaceApps",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Order = table.Column<int>(type: "int", nullable: false),
                    IsHidden = table.Column<bool>(type: "bit", nullable: false),
                    OnboardedAppId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AppGroupId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    WorkSurfaceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedByAzureOid = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ModifiedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedByAzureOid = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ExternalId = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Type = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkSurfaceApps", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkSurfaceApps_OnboardedApps_OnboardedAppId",
                        column: x => x.OnboardedAppId,
                        principalTable: "OnboardedApps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkSurfaceApps_WorkSurfaceAppGroups_AppGroupId",
                        column: x => x.AppGroupId,
                        principalTable: "WorkSurfaceAppGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WorkSurfaceApps_WorkSurfaces_WorkSurfaceId",
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
                name: "IX_WorkSurfaceApps_OnboardedAppId",
                table: "WorkSurfaceApps",
                column: "OnboardedAppId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkSurfaceApps_WorkSurfaceId",
                table: "WorkSurfaceApps",
                column: "WorkSurfaceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WorkSurfaceApps");

            migrationBuilder.CreateTable(
                name: "WorkSurfaceApplications",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AppGroupId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    OnboardedAppId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    WorkSurfaceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedByAzureOid = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ExternalId = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    IsHidden = table.Column<bool>(type: "bit", nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedByAzureOid = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Order = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkSurfaceApplications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkSurfaceApplications_OnboardedApps_OnboardedAppId",
                        column: x => x.OnboardedAppId,
                        principalTable: "OnboardedApps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkSurfaceApplications_WorkSurfaceAppGroups_AppGroupId",
                        column: x => x.AppGroupId,
                        principalTable: "WorkSurfaceAppGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WorkSurfaceApplications_WorkSurfaces_WorkSurfaceId",
                        column: x => x.WorkSurfaceId,
                        principalTable: "WorkSurfaces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WorkSurfaceApplications_AppGroupId",
                table: "WorkSurfaceApplications",
                column: "AppGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkSurfaceApplications_OnboardedAppId",
                table: "WorkSurfaceApplications",
                column: "OnboardedAppId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkSurfaceApplications_WorkSurfaceId",
                table: "WorkSurfaceApplications",
                column: "WorkSurfaceId");
        }
    }
}
