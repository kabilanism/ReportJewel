using ReportJewelAPI.Entities;

namespace ReportJewelAPI.Data.Repositories.Interfaces
{
  public interface ILayoutRepository
  {
    Task<Layout> AddLayoutAsync(Layout layout);
    void RemoveLayout(Layout layout);
    Task<LayoutControl> AddControlAsync(LayoutControl control);
    void RemoveControl(LayoutControl control);
    Task<IEnumerable<Layout>> GetLayoutsByUserIdAsync(int userId);
    Task<Layout> GetLayoutByIdAsync(int id);
    Task<LayoutControl> GetControlByIdAsync(int id);
    Task<bool> SaveChangesAsync();
  }

}

