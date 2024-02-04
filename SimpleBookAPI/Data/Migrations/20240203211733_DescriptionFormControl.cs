using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SimpleBookAPI.Data.Migrations
{
    /// <inheritdoc />
    public partial class DescriptionFormControl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "FormControl",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "FormControl");
        }
    }
}
