using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Equinor.ProjectExecutionPortal.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class DeleteOldPortal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkSurfaces_Portals_PortalId",
                table: "WorkSurfaces");

            migrationBuilder.DropTable(
                name: "Portals");

            migrationBuilder.DropIndex(
                name: "IX_WorkSurfaces_PortalId",
                table: "WorkSurfaces");

            migrationBuilder.DropColumn(
                name: "PortalId",
                table: "WorkSurfaces");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "PortalId",
                table: "WorkSurfaces",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Portals",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedByAzureOid = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: false),
                    ModifiedAtUtc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedByAzureOid = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Portals", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WorkSurfaces_PortalId",
                table: "WorkSurfaces",
                column: "PortalId");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkSurfaces_Portals_PortalId",
                table: "WorkSurfaces",
                column: "PortalId",
                principalTable: "Portals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
