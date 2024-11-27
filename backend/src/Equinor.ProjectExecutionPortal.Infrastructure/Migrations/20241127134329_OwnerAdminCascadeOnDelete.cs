using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Equinor.ProjectExecutionPortal.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class OwnerAdminCascadeOnDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PortalAdmins_Accounts_AccountId",
                table: "PortalAdmins");

            migrationBuilder.DropForeignKey(
                name: "FK_PortalAdmins_Portals_PortalId",
                table: "PortalAdmins");

            migrationBuilder.DropForeignKey(
                name: "FK_PortalOwners_Accounts_AccountId",
                table: "PortalOwners");

            migrationBuilder.DropForeignKey(
                name: "FK_PortalOwners_Portals_PortalId",
                table: "PortalOwners");

            migrationBuilder.AddForeignKey(
                name: "FK_PortalAdmins_Accounts_AccountId",
                table: "PortalAdmins",
                column: "AccountId",
                principalTable: "Accounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PortalAdmins_Portals_PortalId",
                table: "PortalAdmins",
                column: "PortalId",
                principalTable: "Portals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PortalOwners_Accounts_AccountId",
                table: "PortalOwners",
                column: "AccountId",
                principalTable: "Accounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PortalOwners_Portals_PortalId",
                table: "PortalOwners",
                column: "PortalId",
                principalTable: "Portals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PortalAdmins_Accounts_AccountId",
                table: "PortalAdmins");

            migrationBuilder.DropForeignKey(
                name: "FK_PortalAdmins_Portals_PortalId",
                table: "PortalAdmins");

            migrationBuilder.DropForeignKey(
                name: "FK_PortalOwners_Accounts_AccountId",
                table: "PortalOwners");

            migrationBuilder.DropForeignKey(
                name: "FK_PortalOwners_Portals_PortalId",
                table: "PortalOwners");

            migrationBuilder.AddForeignKey(
                name: "FK_PortalAdmins_Accounts_AccountId",
                table: "PortalAdmins",
                column: "AccountId",
                principalTable: "Accounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PortalAdmins_Portals_PortalId",
                table: "PortalAdmins",
                column: "PortalId",
                principalTable: "Portals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PortalOwners_Accounts_AccountId",
                table: "PortalOwners",
                column: "AccountId",
                principalTable: "Accounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PortalOwners_Portals_PortalId",
                table: "PortalOwners",
                column: "PortalId",
                principalTable: "Portals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
