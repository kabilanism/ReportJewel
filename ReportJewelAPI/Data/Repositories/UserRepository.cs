using Microsoft.EntityFrameworkCore;
using ReportJewelAPI.Data.Repositories.Interfaces;
using ReportJewelAPI.Entities;

namespace ReportJewelAPI.Data.Repositories
{
  public class UserRepository : IUserRepository
  {
    private readonly DataContext _context;
    public UserRepository(DataContext context)
    {
      _context = context;
    }

    public async Task<User> GetUserByIdAsync(int id)
    {
      return await _context.Users
        .FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task<User> GetUserByUsernameAsync(string username)
    {
      return await _context.Users
        .SingleOrDefaultAsync(u => u.UserName == username);
    }

    public async Task<bool> SaveChangesAsync()
    {
      return await _context.SaveChangesAsync() > 0;
    }

    public void UpdateUser(User user)
    {
      throw new NotImplementedException();
    }
  }
}

