using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace ReportJewelAPI.Entities
{
  public class User : IdentityUser<int>
  {
    public ICollection<Layout> Layouts { get; set; }
    public ICollection<Client> Clients { get; set; }
    public DateOnly DateOfBirth { get; set; }
    public ICollection<UserRole> UserRoles { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
  }
}

