﻿using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ReportJewelAPI.Data.DTOs;
using ReportJewelAPI.Data.Repositories.Interfaces;
using ReportJewelAPI.Entities;

namespace ReportJewelAPI.Data.Repositories
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
      var foo = await _context.User
        .FirstOrDefaultAsync(u => u.Id == id);

      return await _context.User
        .FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task<User> GetUserByUsernameAsync(string username)
    {
      return await _context.User
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

