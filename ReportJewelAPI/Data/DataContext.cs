using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ReportJewelAPI.Entities;

namespace ReportJewelAPI.Data
{
  public class DataContext : IdentityDbContext<User, Role, int,
    IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>,
    IdentityRoleClaim<int>, IdentityUserToken<int>>
  {
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<User> User { get; set; }
    public DbSet<Layout> Layout { get; set; }
    public DbSet<LayoutControl> LayoutControl { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      modelBuilder.UseIdentityAlwaysColumns();

      modelBuilder.Entity<User>()
        .HasMany(ur => ur.UserRoles)
        .WithOne(u => u.User)
        .HasForeignKey(ur => ur.UserId)
        .IsRequired();

      modelBuilder.Entity<Role>()
        .HasMany(ur => ur.UserRoles)
        .WithOne(u => u.Role)
        .HasForeignKey(ur => ur.RoleId)
        .IsRequired();

      modelBuilder.Entity<User>()
        .HasMany(u => u.Layouts)
        .WithOne(l => l.User)
        .HasForeignKey(l => l.UserId)
        .HasPrincipalKey(u => u.Id);

      modelBuilder.Entity<Layout>()
        .HasMany(l => l.LayoutControls)
        .WithOne(lc => lc.Layout)
        .HasForeignKey(lc => lc.LayoutId)
        .HasPrincipalKey(l => l.Id);

      modelBuilder.Entity<Layout>()
        .Property(l => l.Id)
        .ValueGeneratedOnAdd();

      modelBuilder.Entity<LayoutControl>()
        .Property(lc => lc.Id)
        .ValueGeneratedOnAdd();
    }
  }
}


