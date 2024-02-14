using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReportJewelAPI.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateFormControl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CellSource",
                table: "FormControl",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Row",
                table: "FormControl",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Section",
                table: "FormControl",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CellSource",
                table: "FormControl");

            migrationBuilder.DropColumn(
                name: "Row",
                table: "FormControl");

            migrationBuilder.DropColumn(
                name: "Section",
                table: "FormControl");
        }
    }
}
