using Microsoft.AspNetCore.Mvc;
using SimpleBookAPI.Entities;

namespace SimpleBookAPI.Data.Repositories.Interfaces
{
  public interface IUserRepository
  {
    void UpdateUser(User user);
    Task<User> GetUserByIdAsync(int id);
    Task<User> GetUserByUsernameAsync(string username);
  }

}

