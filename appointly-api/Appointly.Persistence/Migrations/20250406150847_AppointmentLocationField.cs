using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Appointly.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AppointmentLocationField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AppointmentLocation",
                table: "TB_Appointments",
                type: "VARCHAR(30)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AppointmentLocation",
                table: "TB_Appointments");
        }
    }
}
