using Microsoft.AspNetCore.Mvc;
using ReportJewelAPI.Entities;

namespace ReportJewelAPI.Data.Repositories.Interfaces
{
  public interface IUserRepository
  {
    void UpdateUser(User user);
    Task<User> GetUserByIdAsync(int id);
    Task<User> GetUserByUsernameAsync(string username);
    Task<bool> SaveChangesAsync();
  }

}

