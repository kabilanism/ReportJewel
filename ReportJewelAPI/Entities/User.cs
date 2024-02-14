using System.ComponentModel.DataAnnotations;

namespace ReportJewelAPI.Entities
{
  public class User
  {
    public int Id { get; set; }
    public ICollection<Layout> Layouts { get; set; }
    public ICollection<Client> Clients { get; set; }
    [Required]
    public string Username { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [Required]
    public DateOnly DateOfBirth { get; set; }
    [Required]
    public string Email { get; set; }
  }
}

