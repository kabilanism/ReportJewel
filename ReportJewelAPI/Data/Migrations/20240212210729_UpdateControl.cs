using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReportJewelAPI.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateControl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "FormControl");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "FormControl",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
