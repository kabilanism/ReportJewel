using System.ComponentModel.DataAnnotations;

namespace SimpleBookAPI.Entities
{
  public class User
  {
    public Guid Id { get; set; }
    public ICollection<Form> Forms { get; set; }
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

