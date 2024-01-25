using Microsoft.EntityFrameworkCore;
using SimpleBookAPI.Entities;

namespace SimpleBookAPI.Data
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Client> Client { get; set; }
    public DbSet<Form> Form { get; set; }
    public DbSet<FormControl> FormControl { get; set; }
    public DbSet<FormControlOption> FormControlOption { get; set; }
    public DbSet<FormControlValue> FormControlValue { get; set; }
    public DbSet<FormInstance> FormInstance { get; set; }
    public DbSet<User> User { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      modelBuilder.Entity<User>()
        .HasMany(e => e.Forms)
        .WithOne(e => e.User)
        .HasForeignKey(e => e.UserId)
        .HasPrincipalKey(e => e.Id);

      modelBuilder.Entity<User>()
        .HasMany(e => e.Clients)
        .WithOne(e => e.User)
        .HasForeignKey(e => e.UserId)
        .HasPrincipalKey(e => e.Id);

      modelBuilder.Entity<Client>()
        .HasMany(e => e.FormInstances)
        .WithOne(e => e.Client)
        .HasForeignKey(e => e.ClientId)
        .HasPrincipalKey(e => e.Id);

      modelBuilder.Entity<Form>()
        .HasMany(e => e.FormControls)
        .WithOne(e => e.Form)
        .HasForeignKey(e => e.FormId)
        .HasPrincipalKey(e => e.Id);

      modelBuilder.Entity<Form>()
        .HasMany(e => e.FormInstances)
        .WithOne(e => e.Form)
        .HasForeignKey(e => e.FormId)
        .HasPrincipalKey(e => e.Id);

      modelBuilder.Entity<FormControl>()
        .HasMany(e => e.FormControlOptions)
        .WithOne(e => e.FormControl)
        .HasForeignKey(e => e.FormControlId)
        .HasPrincipalKey(e => e.Id);

      modelBuilder.Entity<FormControl>()
        .HasMany(e => e.FormControlValues)
        .WithOne(e => e.FormControl)
        .HasForeignKey(e => e.FormControlId)
        .HasPrincipalKey(e => e.Id);

      modelBuilder.Entity<FormControlOption>()
        .HasOne(e => e.FormControlValue)
        .WithOne(e => e.FormControlOption)
        .HasForeignKey<FormControlValue>(e => e.FormControlOptionId)
        .HasPrincipalKey<FormControlOption>(e => e.Id);

      modelBuilder.Entity<FormInstance>()
        .HasMany(e => e.FormControlValues)
        .WithOne(e => e.FormInstance)
        .HasForeignKey(e => e.FormInstanceId)
        .HasPrincipalKey(e => e.Id);
    }
  }
}


