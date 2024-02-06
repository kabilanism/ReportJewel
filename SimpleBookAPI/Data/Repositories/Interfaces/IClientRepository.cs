using SimpleBookAPI.Entities;

namespace SimpleBookAPI.Data.Repositories.Interfaces
{
  public interface IClientRepository
  {
    Task<IEnumerable<Client>> GetClientsByUserId(int userId);
  }

}

