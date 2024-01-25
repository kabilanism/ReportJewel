using System.ComponentModel.DataAnnotations;

namespace SimpleBookAPI.Entities
{
  public class Form
  {
    public Guid Id { get; set; }
    [Required]
    public string Name { get; set; }
    public string Description { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; }
    public ICollection<FormControl> FormControls { get; set; }
    public ICollection<FormInstance> FormInstances { get; set; }
  }
}

