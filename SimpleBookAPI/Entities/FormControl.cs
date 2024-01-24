namespace SimpleBookAPI.Entities
{
  public class FormControl
  {
    public int FormControlId { get; set; }
    public string Type { get; set; }
    public string Name { get; set; }
    public string Placeholder { get; set; }
    public string Label { get; set; }
    public int Order { get; set; }
    public string Value { get; set; }
    public List<SelectOption> Options { get; set; } = new();
  }

  public class SelectOption
  {
    public string Value { get; set; }
    public string DisplayValue { get; set; }
  }
}

