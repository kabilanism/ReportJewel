using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace SimpleBookAPI.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddedFormControlOptionValue : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FormControlValue_FormControlOption_FormControlOptionId",
                table: "FormControlValue");

            migrationBuilder.DropIndex(
                name: "IX_FormControlValue_FormControlOptionId",
                table: "FormControlValue");

            migrationBuilder.DropColumn(
                name: "FormControlOptionId",
                table: "FormControlValue");

            migrationBuilder.DropColumn(
                name: "FormControlValueId",
                table: "FormControlOption");

            migrationBuilder.CreateTable(
                name: "FormControlOptionValue",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    FormInstanceId = table.Column<int>(type: "integer", nullable: false),
                    FormControlOptionId = table.Column<int>(type: "integer", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormControlOptionValue", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FormControlOptionValue_FormControlOption_FormControlOptionId",
                        column: x => x.FormControlOptionId,
                        principalTable: "FormControlOption",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FormControlOptionValue_FormInstance_FormInstanceId",
                        column: x => x.FormInstanceId,
                        principalTable: "FormInstance",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FormControlOptionValue_FormControlOptionId",
                table: "FormControlOptionValue",
                column: "FormControlOptionId");

            migrationBuilder.CreateIndex(
                name: "IX_FormControlOptionValue_FormInstanceId",
                table: "FormControlOptionValue",
                column: "FormInstanceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FormControlOptionValue");

            migrationBuilder.AddColumn<int>(
                name: "FormControlOptionId",
                table: "FormControlValue",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FormControlValueId",
                table: "FormControlOption",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_FormControlValue_FormControlOptionId",
                table: "FormControlValue",
                column: "FormControlOptionId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_FormControlValue_FormControlOption_FormControlOptionId",
                table: "FormControlValue",
                column: "FormControlOptionId",
                principalTable: "FormControlOption",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
