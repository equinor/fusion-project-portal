using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Equinor.ProjectExecutionPortal.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RemoveOrderFromPortalAndIsLegacyFromOnboardedApps : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Order",
                table: "Portals");

            migrationBuilder.DropColumn(
                name: "IsLegacy",
                table: "OnboardedApps");

            migrationBuilder.DropColumn(
                name: "Order",
                table: "OnboardedApps");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "Portals",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsLegacy",
                table: "OnboardedApps",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "OnboardedApps",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
