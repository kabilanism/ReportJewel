using Microsoft.EntityFrameworkCore;
using SimpleBookAPI.Entities;

namespace SimpleBookAPI.Data
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<User> User { get; set; }
    public DbSet<Client> Client { get; set; }
    public DbSet<Form> Form { get; set; }
    public DbSet<FormControl> FormControl { get; set; }
    public DbSet<FormControlValue> FormControlValue { get; set; }
    public DbSet<FormControlOption> FormControlOption { get; set; }
    public DbSet<FormControlOptionValue> FormControlOptionValue { get; set; }
    public DbSet<FormInstance> FormInstance { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      modelBuilder.UseIdentityAlwaysColumns();

      modelBuilder.Entity<User>()
        .HasMany(u => u.Forms)
        .WithOne(f => f.User)
        .HasForeignKey(f => f.UserId)
        .HasPrincipalKey(u => u.Id);

      modelBuilder.Entity<User>()
        .HasMany(u => u.Clients)
        .WithOne(c => c.User)
        .HasForeignKey(c => c.UserId);

      modelBuilder.Entity<Client>()
        .HasMany(c => c.FormInstances)
        .WithOne(fi => fi.Client)
        .HasForeignKey(fi => fi.ClientId)
        .HasPrincipalKey(c => c.Id);

      modelBuilder.Entity<Client>()
        .Property(c => c.Id)
        .ValueGeneratedOnAdd();

      modelBuilder.Entity<Form>()
        .HasMany(f => f.FormControls)
        .WithOne(fc => fc.Form)
        .HasForeignKey(fc => fc.FormId)
        .HasPrincipalKey(f => f.Id);

      modelBuilder.Entity<Form>()
        .HasMany(f => f.FormInstances)
        .WithOne(fi => fi.Form)
        .HasForeignKey(fi => fi.FormId);

      modelBuilder.Entity<Form>()
        .Property(f => f.Id)
        .ValueGeneratedOnAdd();

      modelBuilder.Entity<FormControl>()
        .HasMany(fc => fc.FormControlOptions)
        .WithOne(fco => fco.FormControl)
        .HasForeignKey(fco => fco.FormControlId)
        .HasPrincipalKey(fc => fc.Id);

      modelBuilder.Entity<FormControl>()
        .HasMany(fc => fc.FormControlValues)
        .WithOne(fcv => fcv.FormControl)
        .HasForeignKey(fcv => fcv.FormControlId);

      modelBuilder.Entity<FormControl>()
        .Property(fc => fc.Id)
        .ValueGeneratedOnAdd();

      modelBuilder.Entity<FormControlOption>()
        .HasMany(fco => fco.FormControlOptionValues)
        .WithOne(fcov => fcov.FormControlOption)
        .HasForeignKey(fcov => fcov.FormControlOptionId);

      modelBuilder.Entity<FormControlOption>()
        .Property(fco => fco.Id)
        .ValueGeneratedOnAdd();

      modelBuilder.Entity<FormControlValue>()
        .Property(fcv => fcv.Id)
        .ValueGeneratedOnAdd();

      modelBuilder.Entity<FormInstance>()
        .HasMany(e => e.FormControlValues)
        .WithOne(e => e.FormInstance)
        .HasForeignKey(e => e.FormInstanceId)
        .HasPrincipalKey(e => e.Id);

      modelBuilder.Entity<FormInstance>()
        .HasMany(fi => fi.FormControlOptionValues)
        .WithOne(fcov => fcov.FormInstance)
        .HasForeignKey(fcov => fcov.FormInstanceId);

      modelBuilder.Entity<FormInstance>()
        .Property(fi => fi.Id)
        .ValueGeneratedOnAdd();
    }
  }
}


