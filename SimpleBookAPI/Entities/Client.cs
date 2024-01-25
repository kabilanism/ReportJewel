using System.ComponentModel.DataAnnotations;

namespace SimpleBookAPI.Entities
{
  public class Client
  {
    public Guid Id { get; set; }
    [Required]
    public Guid UserId { get; set; }
    public User User { get; set; }
    public ICollection<FormInstance> FormInstances { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string Address { get; set; }
    [Required]
    public string Email { get; set; }
  }
}

