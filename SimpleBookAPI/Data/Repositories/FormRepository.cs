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

    public async Task<Form> GetFormByIdAsync(int id)
    {
      return await _context.Form.SingleOrDefaultAsync(f => f.Id == id);
    }

    public async Task<IEnumerable<Form>> GetFormsByUserIdAsync(int userId)
    {
      return await _context.Form
        .Where(f => f.UserId == userId)
        .Include(f => f.FormControls)
        .ToListAsync();
    }

    public async Task<FormControl> GetControlByIdAsync(int id)
    {
      return await _context.FormControl.SingleOrDefaultAsync(c => c.Id == id);
    }

    public async Task<Form> AddFormAsync(Form form)
    {
      await _context.Form.AddAsync(form);
      return form;
    }

    public async Task<bool> SaveChangesAsync()
    {
      return await _context.SaveChangesAsync() > 0;
    }
  }
}

