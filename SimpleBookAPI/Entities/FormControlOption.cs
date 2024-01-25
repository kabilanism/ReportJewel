using System.ComponentModel.DataAnnotations;

namespace SimpleBookAPI.Entities
{
  public class FormControlOption
  {
    public Guid Id { get; set; }
    public Guid FormControlId { get; set; }
    public FormControl FormControl { get; set; }
    public Guid FormControlValueId { get; set; }
    public FormControlValue FormControlValue { get; set; }
    [Required]
    public string Name { get; set; }

  }
}
