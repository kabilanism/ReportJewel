﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SimpleBookAPI.Data;

#nullable disable

namespace SimpleBookAPI.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.15");

            modelBuilder.Entity("SimpleBookAPI.Entities.Client", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("UserId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Client");
                });

            modelBuilder.Entity("SimpleBookAPI.Entities.Form", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("UserId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Form");
                });

            modelBuilder.Entity("SimpleBookAPI.Entities.FormControl", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("FormId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Label")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Order")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Placeholder")
                        .HasColumnType("TEXT");

                    b.Property<bool>("Required")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("FormId");

                    b.ToTable("FormControl");
                });

            modelBuilder.Entity("SimpleBookAPI.Entities.FormControlOption", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("FormControlId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("FormControlValueId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("FormControlId");

                    b.ToTable("FormControlOption");
                });

            modelBuilder.Entity("SimpleBookAPI.Entities.FormControlValue", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("FormControlId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("FormControlOptionId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("FormInstanceId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("FormControlId");

                    b.HasIndex("FormControlOptionId")
                        .IsUnique();

                    b.HasIndex("FormInstanceId");

                    b.ToTable("FormControlValue");
                });

            modelBuilder.Entity("SimpleBookAPI.Entities.FormInstance", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("ClientId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("FormId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("ClientId");

                    b.HasIndex("FormId");

                    b.ToTable("FormInstance");
                });

            modelBuilder.Entity("SimpleBookAPI.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<DateOnly>("DateOfBirth")
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("TEXT");

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
