using System.ComponentModel.DataAnnotations;

namespace SimpleBookAPI.Entities
{
  public class FormInstance
  {
    public int Id { get; set; }
    public int ClientId { get; set; }
    public Client Client { get; set; }
    public int FormId { get; set; }
    public Form Form { get; set; }
    public ICollection<FormControlValue> FormControlValues { get; set; }
    public ICollection<FormControlOptionValue> FormControlOptionValues { get; set; }
    [Required]
    public string Name { get; set; }
  }
}

