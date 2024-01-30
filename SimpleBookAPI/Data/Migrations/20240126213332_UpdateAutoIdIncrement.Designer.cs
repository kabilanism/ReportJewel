﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using SimpleBookAPI.Data;

#nullable disable

namespace SimpleBookAPI.Data.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20240126213332_UpdateAutoIdIncrement")]
    partial class UpdateAutoIdIncrement
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.15")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("SimpleBookAPI.Entities.Client", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Client");
                });

            modelBuilder.Entity("SimpleBookAPI.Entities.Form", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Form");
                });

            modelBuilder.Entity("SimpleBookAPI.Entities.FormControl", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("FormId")
                        .HasColumnType("integer");

                    b.Property<string>("Label")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Order")
                        .HasColumnType("integer");

                    b.Property<string>("Placeholder")
                        .HasColumnType("text");

                    b.Property<bool>("Required")
                        .HasColumnType("boolean");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("FormId");

                    b.ToTable("FormControl");
                });

            modelBuilder.Entity("SimpleBookAPI.Entities.FormControlOption", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("FormControlId")
                        .HasColumnType("integer");

                    b.Property<int>("FormControlValueId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("FormControlId");

                    b.ToTable("FormControlOption");
                });

            modelBuilder.Entity("SimpleBookAPI.Entities.FormControlValue", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("FormControlId")
                        .HasColumnType("integer");

                    b.Property<int>("FormControlOptionId")
                        .HasColumnType("integer");

                    b.Property<int>("FormInstanceId")
                        .HasColumnType("integer");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("FormControlId");

                    b.HasIndex("FormControlOptionId")
                        .IsUnique();

                    b.HasIndex("FormInstanceId");

                    b.ToTable("FormControlValue");
                });

            modelBuilder.Entity("SimpleBookAPI.Entities.FormInstance", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("ClientId")
                        .HasColumnType("integer");

                    b.Property<int>("FormId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("ClientId");

                    b.HasIndex("FormId");

                    b.ToTable("FormInstance");
                });

            modelBuilder.Entity("SimpleBookAPI.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateOnly>("DateOfBirth")
                        .HasColumnType("date");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("User");
                });

            modelBuilder.Entity("SimpleBookAPI.Entities.Client", b =>
                {
                    b.HasOne("SimpleBookAPI.Entities.User", "User")
                        .WithMany("Clients")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("SimpleBookAPI.Entities.Form", b =>
                {
                    b.HasOne("SimpleBookAPI.Entities.User", "User")
                        .WithMany("Forms")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("SimpleBookAPI.Entities.FormControl", b =>
                {
                    b.HasOne("SimpleBookAPI.Entities.Form", "Form")
                        .WithMany("FormControls")
                        .HasForeignKey("FormId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Form");
                });

            modelBuilder.Entity("SimpleBookAPI.Entities.FormControlOption", b =>
                {
                    b.HasOne("SimpleBookAPI.Entities.FormControl", "FormControl")
                        .WithMany("FormControlOptions")
                        .HasForeignKey("FormControlId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("FormControl");
                });

            modelBuilder.Entity("SimpleBookAPI.Entities.FormControlValue", b =>
                {
                    b.HasOne("SimpleBookAPI.Entities.FormControl", "FormControl")
                        .WithMany("FormControlValues")
                        .HasForeignKey("FormControlId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SimpleBookAPI.Entities.FormControlOption", "FormControlOption")
                        .WithOne("FormControlValue")
                        .HasForeignKey("SimpleBookAPI.Entities.FormControlValue", "FormControlOptionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SimpleBookAPI.Entities.FormInstance", "FormInstance")
                        .WithMany("FormControlValues")
                        .HasForeignKey("FormInstanceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("FormControl");

                    b.Navigation("FormControlOption");

                    b.Navigation("FormInstance");
                });

            modelBuilder.Entity("SimpleBookAPI.Entities.FormInstance", b =>
                {
                    b.HasOne("SimpleBookAPI.Entities.Client", "Client")
                        .WithMany("FormInstances")
                        .HasForeignKey("ClientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SimpleBookAPI.Entities.Form", "Form")
                        .WithMany("FormInstances")
                        .HasForeignKey("FormId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Client");

                    b.Navigation("Form");
                });

            modelBuilder.Entity("SimpleBookAPI.Entities.Client", b =>
                {
                    b.Navigation("FormInstances");
                });

            modelBuilder.Entity("SimpleBookAPI.Entities.Form", b =>
                {
                    b.Navigation("FormControls");

                    b.Navigation("FormInstances");
                });

            modelBuilder.Entity("SimpleBookAPI.Entities.FormControl", b =>
                {
                    b.Navigation("FormControlOptions");

                    b.Navigation("FormControlValues");
                });

            modelBuilder.Entity("SimpleBookAPI.Entities.FormControlOption", b =>
                {
                    b.Navigation("FormControlValue");
                });

            modelBuilder.Entity("SimpleBookAPI.Entities.FormInstance", b =>
                {
                    b.Navigation("FormControlValues");
                });

            modelBuilder.Entity("SimpleBookAPI.Entities.User", b =>
                {
                    b.Navigation("Clients");

                    b.Navigation("Forms");
                });
#pragma warning restore 612, 618
        }
    }
}
