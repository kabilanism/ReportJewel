using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ReportJewelAPI.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateNamingConvention : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FormControlOptionValue");

            migrationBuilder.DropTable(
                name: "FormControlValue");

            migrationBuilder.DropTable(
                name: "FormControlOption");

            migrationBuilder.DropTable(
                name: "FormInstance");

            migrationBuilder.DropTable(
                name: "FormControl");

            migrationBuilder.DropTable(
                name: "Form");

            migrationBuilder.CreateTable(
                name: "Layout",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Layout", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Layout_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LayoutControl",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    LayoutId = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Placeholder = table.Column<string>(type: "text", nullable: true),
                    Label = table.Column<string>(type: "text", nullable: false),
                    Section = table.Column<int>(type: "integer", nullable: false),
                    Row = table.Column<int>(type: "integer", nullable: false),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    CellSource = table.Column<string>(type: "text", nullable: true),
                    Required = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LayoutControl", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LayoutControl_Layout_LayoutId",
                        column: x => x.LayoutId,
                        principalTable: "Layout",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Layout_UserId",
                table: "Layout",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_LayoutControl_LayoutId",
                table: "LayoutControl",
                column: "LayoutId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LayoutControl");

            migrationBuilder.DropTable(
                name: "Layout");

            migrationBuilder.CreateTable(
                name: "Form",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Form", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Form_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FormControl",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    FormId = table.Column<int>(type: "integer", nullable: false),
                    CellSource = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Label = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    Placeholder = table.Column<string>(type: "text", nullable: true),
                    Required = table.Column<bool>(type: "boolean", nullable: false),
                    Row = table.Column<int>(type: "integer", nullable: false),
                    Section = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormControl", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FormControl_Form_FormId",
                        column: x => x.FormId,
                        principalTable: "Form",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FormInstance",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    ClientId = table.Column<int>(type: "integer", nullable: false),
                    FormId = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormInstance", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FormInstance_Client_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Client",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FormInstance_Form_FormId",
                        column: x => x.FormId,
                        principalTable: "Form",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FormControlOption",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    FormControlId = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormControlOption", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FormControlOption_FormControl_FormControlId",
                        column: x => x.FormControlId,
                        principalTable: "FormControl",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FormControlValue",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    FormControlId = table.Column<int>(type: "integer", nullable: false),
                    FormInstanceId = table.Column<int>(type: "integer", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormControlValue", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FormControlValue_FormControl_FormControlId",
                        column: x => x.FormControlId,
                        principalTable: "FormControl",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FormControlValue_FormInstance_FormInstanceId",
                        column: x => x.FormInstanceId,
                        principalTable: "FormInstance",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FormControlOptionValue",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    FormControlOptionId = table.Column<int>(type: "integer", nullable: false),
                    FormInstanceId = table.Column<int>(type: "integer", nullable: false),
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
                name: "IX_Form_UserId",
                table: "Form",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FormControl_FormId",
                table: "FormControl",
                column: "FormId");

            migrationBuilder.CreateIndex(
                name: "IX_FormControlOption_FormControlId",
                table: "FormControlOption",
                column: "FormControlId");

            migrationBuilder.CreateIndex(
                name: "IX_FormControlOptionValue_FormControlOptionId",
                table: "FormControlOptionValue",
                column: "FormControlOptionId");

            migrationBuilder.CreateIndex(
                name: "IX_FormControlOptionValue_FormInstanceId",
                table: "FormControlOptionValue",
                column: "FormInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_FormControlValue_FormControlId",
                table: "FormControlValue",
                column: "FormControlId");

            migrationBuilder.CreateIndex(
                name: "IX_FormControlValue_FormInstanceId",
                table: "FormControlValue",
                column: "FormInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_FormInstance_ClientId",
                table: "FormInstance",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_FormInstance_FormId",
                table: "FormInstance",
                column: "FormId");
        }
    }
}
