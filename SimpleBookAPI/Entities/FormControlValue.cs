using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SimpleBookAPI.Entities
{
  public class FormControlValue
  {
    public int Id { get; set; }
    public int FormInstanceId { get; set; }
    public FormInstance FormInstance { get; set; }
    public int FormControlId { get; set; }
    public FormControl FormControl { get; set; }
    [Required]
    public string Value { get; set; }
  }
}

