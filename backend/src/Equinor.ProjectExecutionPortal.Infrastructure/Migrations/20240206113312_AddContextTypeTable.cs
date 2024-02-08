using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Equinor.ProjectExecutionPortal.Infrastructure.Migrations
{
    public partial class AddContextTypeTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ContextTypes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ContextTypeKey = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedByAzureOid = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ModifiedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedByAzureOid = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContextTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WorkSurfaceContextTypes",
                columns: table => new
                {
                    ContextTypesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    WorkSurfacesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkSurfaceContextTypes", x => new { x.ContextTypesId, x.WorkSurfacesId });
                    table.ForeignKey(
                        name: "FK_WorkSurfaceContextTypes_ContextTypes_ContextTypesId",
                        column: x => x.ContextTypesId,
                        principalTable: "ContextTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkSurfaceContextTypes_WorkSurfaces_WorkSurfacesId",
                        column: x => x.WorkSurfacesId,
                        principalTable: "WorkSurfaces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ContextTypes_ContextTypeKey",
                table: "ContextTypes",
                column: "ContextTypeKey",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_WorkSurfaceContextTypes_WorkSurfacesId",
                table: "WorkSurfaceContextTypes",
                column: "WorkSurfacesId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WorkSurfaceContextTypes");

            migrationBuilder.DropTable(
                name: "ContextTypes");
        }
    }
}
