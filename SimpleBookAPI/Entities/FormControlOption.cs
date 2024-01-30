using System.ComponentModel.DataAnnotations;

namespace SimpleBookAPI.Entities
{
  public class FormControlOption
  {
    public int Id { get; set; }
    public int FormControlId { get; set; }
    public FormControl FormControl { get; set; }
    [Required]
    public string Name { get; set; }
    public ICollection<FormControlOptionValue> FormControlOptionValues { get; set; }
  }
}
