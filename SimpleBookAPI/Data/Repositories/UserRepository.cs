using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SimpleBookAPI.Data.DTOs;
using SimpleBookAPI.Data.Repositories.Interfaces;
using SimpleBookAPI.Entities;

namespace SimpleBookAPI.Data.Repositories
{
  public class UserRepository : IUserRepository
  {
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    public UserRepository(DataContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    public async Task<User> GetUserByIdAsync(int id)
    {
      return await _context.User
        .FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task<User> GetUserByUsernameAsync(string username)
    {
      return await _context.User
        .SingleOrDefaultAsync(u => u.Username == username);
    }

    public void UpdateUser(User user)
    {
      throw new NotImplementedException();
    }
  }
}

