using ReportJewelAPI.Data.DTOs;
using ReportJewelAPI.Entities;
using ReportJewelAPI.Helpers;

namespace ReportJewelAPI.Data.Repositories.Interfaces
{
  public interface ILayoutRepository
  {
    Task<Layout> AddLayoutAsync(Layout layout);
    void RemoveLayout(Layout layout);
    Task<LayoutControl> AddControlAsync(LayoutControl control);
    void RemoveControl(LayoutControl control);
    Task<PagedList<LayoutDto>> GetLayoutsAsync(UserParams userParams);
    Task<Layout> GetLayoutByIdAsync(int id);
    Task<LayoutControl> GetControlByIdAsync(int id);
    Task<bool> SaveChangesAsync();
  }

}

