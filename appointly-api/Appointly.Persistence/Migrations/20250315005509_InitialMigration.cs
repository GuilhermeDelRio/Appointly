using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Appointly.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TB_Patients",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FirstName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    LastName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    PhoneNumber = table.Column<string>(type: "character varying(15)", maxLength: 15, nullable: false),
                    Email = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    Fee = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    IsSpecialPatient = table.Column<bool>(type: "boolean", nullable: false),
                    HasAResponsible = table.Column<bool>(type: "boolean", nullable: false),
                    ResponsibleName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    ResponsibleEmail = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    ResponsiblePhoneNumber = table.Column<string>(type: "character varying(15)", maxLength: 15, nullable: true),
                    RelationshipDegree = table.Column<string>(type: "VARCHAR(30)", nullable: true),
                    DateCreated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DateUpdated = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DateDeleted = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TB_Patients", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TB_SystemInfo",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    AppointmentDuration = table.Column<int>(type: "integer", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DateUpdated = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DateDeleted = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TB_SystemInfo", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TB_Appointments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    InitialDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    AppointmentStatus = table.Column<string>(type: "VARCHAR(30)", nullable: false),
                    PatientId = table.Column<Guid>(type: "uuid", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DateUpdated = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DateDeleted = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TB_Appointments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TB_Appointments_TB_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "TB_Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TB_Appointments_PatientId",
                table: "TB_Appointments",
                column: "PatientId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TB_Appointments");

            migrationBuilder.DropTable(
                name: "TB_SystemInfo");

            migrationBuilder.DropTable(
                name: "TB_Patients");
        }
    }
}
