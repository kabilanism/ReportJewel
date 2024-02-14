using ReportJewelAPI.Entities;

namespace ReportJewelAPI.Data.Repositories.Interfaces
{
  public interface IClientRepository
  {
    Task<IEnumerable<Client>> GetClientsByUserId(int userId);
  }

}

