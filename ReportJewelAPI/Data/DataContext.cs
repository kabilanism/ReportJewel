using Microsoft.EntityFrameworkCore;
using ReportJewelAPI.Entities;

namespace ReportJewelAPI.Data
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<User> User { get; set; }
    public DbSet<Client> Client { get; set; }
    public DbSet<Layout> Layout { get; set; }
    public DbSet<LayoutControl> LayoutControl { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      modelBuilder.UseIdentityAlwaysColumns();

      modelBuilder.Entity<User>()
        .HasMany(u => u.Layouts)
        .WithOne(f => f.User)
        .HasForeignKey(f => f.UserId)
        .HasPrincipalKey(u => u.Id);

      modelBuilder.Entity<User>()
        .HasMany(u => u.Clients)
        .WithOne(c => c.User)
        .HasForeignKey(c => c.UserId);

      modelBuilder.Entity<Client>()
        .Property(c => c.Id)
        .ValueGeneratedOnAdd();

      modelBuilder.Entity<Layout>()
        .HasMany(f => f.LayoutControls)
        .WithOne(fc => fc.Layout)
        .HasForeignKey(fc => fc.LayoutId)
        .HasPrincipalKey(f => f.Id);

      modelBuilder.Entity<Layout>()
        .Property(f => f.Id)
        .ValueGeneratedOnAdd();

      modelBuilder.Entity<LayoutControl>()
        .Property(fc => fc.Id)
        .ValueGeneratedOnAdd();
    }
  }
}


