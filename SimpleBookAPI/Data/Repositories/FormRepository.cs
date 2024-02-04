using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SimpleBookAPI.Data.Repositories.Interfaces;
using SimpleBookAPI.Entities;

namespace SimpleBookAPI.Data.Repositories
{
  public class FormRepository : IFormRepository
  {
    private readonly DataContext _context;
    public FormRepository(DataContext context)
    {
      _context = context;
    }

    public async Task<IEnumerable<Form>> GetFormsByUserId(int id)
    {
      return await _context.Form
        .Where(f => f.UserId == id)
        .Include(f => f.FormControls)
        .ToListAsync();
    }
  }
}

