using System.ComponentModel.DataAnnotations;

namespace SimpleBookAPI.Entities
{
  public class FormInstance
  {
    public Guid Id { get; set; }
    public Guid ClientId { get; set; }
    public Client Client { get; set; }
    public Guid FormId { get; set; }
    public Form Form { get; set; }
    public ICollection<FormControlValue> FormControlValues { get; set; }
    [Required]
    public string Name { get; set; }
  }
}

