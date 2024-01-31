using SimpleBookAPI.Entities;

namespace SimpleBookAPI.Data.Repositories.Interfaces
{
  public interface IFormRepository
  {
    Task<IEnumerable<Form>> GetFormsByUserId(int id);

  }

}

