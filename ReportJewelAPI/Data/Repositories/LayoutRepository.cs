using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using ReportJewelAPI.Data.DTOs;
using ReportJewelAPI.Data.Repositories.Interfaces;
using ReportJewelAPI.Entities;
using ReportJewelAPI.Helpers;
using System.Security.Claims;

namespace ReportJewelAPI.Data.Repositories
{
  public class LayoutRepository : ILayoutRepository
  {
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    public LayoutRepository(DataContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    public async Task<Layout> GetLayoutByIdAsync(int id)
    {
      return await _context.Layout.SingleOrDefaultAsync(f => f.Id == id);
    }

    public async Task<PagedList<LayoutDto>> GetLayoutsAsync(UserParams userParams)
    {
      var query = _context.Layout
        .Where(f => f.UserId == userParams.UserId)
        .Include(f => f.LayoutControls)
        .AsNoTracking();

      return await PagedList<LayoutDto>.CreateAsync(query.AsNoTracking().ProjectTo<LayoutDto>(_mapper.ConfigurationProvider), userParams.PageNumber, userParams.PageSize);
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

