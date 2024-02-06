using Microsoft.EntityFrameworkCore;
using SimpleBookAPI.Data.Repositories.Interfaces;
using SimpleBookAPI.Entities;

namespace SimpleBookAPI.Data.Repositories
{

  public class ClientRepository : IClientRepository
  {
    private readonly DataContext _context;
    public ClientRepository(DataContext context)
    {
      _context = context;
    }
    public async Task<IEnumerable<Client>> GetClientsByUserId(int userId)
    {
      var foo = await _context.Client.ToListAsync();

      return await _context.Client
      .Where(c => c.UserId == userId)
      .ToListAsync();
    }
  }

}
