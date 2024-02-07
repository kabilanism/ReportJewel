namespace SimpleBookAPI;

public class FormControlDto
{
  public int Id { get; set; }
  public string Type { get; set; }
  public string Name { get; set; }
  public string Description { get; set; }
  public string Placeholder { get; set; }
  public string Label { get; set; }
  public int Section { get; set; }
  public int Row { get; set; }
  public string CellSource { get; set; }
  public int Order { get; set; }
  public bool Required { get; set; }
}

