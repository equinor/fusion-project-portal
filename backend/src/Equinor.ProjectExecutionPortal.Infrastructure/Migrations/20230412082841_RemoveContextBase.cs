using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Equinor.ProjectExecutionPortal.Infrastructure.Migrations
{
    public partial class RemoveContextBase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ExternalId",
                table: "WorkSurfaceApps");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "WorkSurfaceApps");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ExternalId",
                table: "WorkSurfaceApps",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "WorkSurfaceApps",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);
        }
    }
}
