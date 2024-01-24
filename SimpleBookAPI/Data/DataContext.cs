using Microsoft.EntityFrameworkCore;
using SimpleBookAPI.Entities;

namespace SimpleBookAPI.Data
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<FormControl> Event { get; set; }
  }
}


