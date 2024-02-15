using ReportJewelAPI.Entities;

namespace ReportJewelAPI.Interfaces
{
  public interface ITokenService
  {
    Task<string> CreateToken(User user);
  }
}

