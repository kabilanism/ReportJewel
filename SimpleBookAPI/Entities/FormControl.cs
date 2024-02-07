using System.ComponentModel.DataAnnotations;

namespace SimpleBookAPI.Entities
{
  public class FormControl
  {
    public int Id { get; set; }
    public int FormId { get; set; }
    public Form Form { get; set; }
    public ICollection<FormControlOption> FormControlOptions { get; set; }
    public ICollection<FormControlValue> FormControlValues { get; set; }
    [Required]
    public string Type { get; set; }
    [Required]
    public string Name { get; set; }
    public string Description { get; set; }
    public string Placeholder { get; set; }
    [Required]
    public string Label { get; set; }
    public int Section { get; set; }
    public int Row { get; set; }
    public int Order { get; set; }
    public string CellSource { get; set; }
    [Required]
    public bool Required { get; set; }
  }
}

