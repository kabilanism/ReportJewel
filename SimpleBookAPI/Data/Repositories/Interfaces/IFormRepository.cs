using SimpleBookAPI.Entities;

namespace SimpleBookAPI.Data.Repositories.Interfaces
{
  public interface IFormRepository
  {
    Task<Form> AddFormAsync(Form form);
    Task<FormControl> AddControlAsync(FormControl control);
    Task<IEnumerable<Form>> GetFormsByUserIdAsync(int userId);
    Task<Form> GetFormByIdAsync(int id);
    Task<FormControl> GetControlByIdAsync(int id);
    Task<bool> SaveChangesAsync();
  }

}

