using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PatientManagementAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateFieldsInContactEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "Contact");

            migrationBuilder.RenameColumn(
                name: "Value",
                table: "Contact",
                newName: "PhoneNumber");

            migrationBuilder.AddColumn<string>(
                name: "EmailAddress",
                table: "Contact",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmailAddress",
                table: "Contact");

            migrationBuilder.RenameColumn(
                name: "PhoneNumber",
                table: "Contact",
                newName: "Value");

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "Contact",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
