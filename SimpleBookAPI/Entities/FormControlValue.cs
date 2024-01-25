using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SimpleBookAPI.Entities
{
  public class FormControlValue
  {
    public Guid Id { get; set; }
    public Guid FormInstanceId { get; set; }
    public FormInstance FormInstance { get; set; }
    public Guid FormControlId { get; set; }
    public FormControl FormControl { get; set; }
    public Guid FormControlOptionId { get; set; }
    public FormControlOption FormControlOption { get; set; }
    [Required]
    public string Value { get; set; }
  }
}

