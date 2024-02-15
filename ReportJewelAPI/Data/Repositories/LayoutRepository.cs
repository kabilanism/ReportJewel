using Microsoft.EntityFrameworkCore;
using ReportJewelAPI.Data.Repositories.Interfaces;
using ReportJewelAPI.Entities;

namespace ReportJewelAPI.Data.Repositories
{
  public class LayoutRepository : ILayoutRepository
  {
    private readonly DataContext _context;
    public LayoutRepository(DataContext context)
    {
      _context = context;
    }

    public async Task<Layout> GetLayoutByIdAsync(int id)
    {
      return await _context.Layout.SingleOrDefaultAsync(f => f.Id == id);
    }

    public async Task<IEnumerable<Layout>> GetLayoutsByUserIdAsync(int userId)
    {
      return await _context.Layout
        .Where(f => f.UserId == userId)
        .Include(f => f.LayoutControls)
        .ToListAsync();
    }

    public async Task<LayoutControl> GetControlByIdAsync(int id)
    {
      return await _context.LayoutControl.SingleOrDefaultAsync(c => c.Id == id);
    }

    public async Task<Layout> AddLayoutAsync(Layout layout)
    {
      await _context.Layout.AddAsync(layout);
      return layout;
    }
    public async Task<LayoutControl> AddControlAsync(LayoutControl control)
    {
      await _context.LayoutControl.AddAsync(control);
      return control;
    }

    public async Task<bool> SaveChangesAsync()
    {
      return await _context.SaveChangesAsync() > 0;
    }

    public void RemoveControl(LayoutControl control)
    {
      _context.LayoutControl.Remove(control);
    }

    public void RemoveLayout(Layout layout)
    {
      _context.Layout.Remove(layout);
    }
  }
}

