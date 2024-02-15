using Microsoft.AspNetCore.Identity;

namespace ReportJewelAPI.Entities
{
  public class Role : IdentityRole<int>
  {
    public ICollection<UserRole> UserRoles { get; set; }
  }
}

