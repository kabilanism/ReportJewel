namespace SimpleBookAPI.Entities
{
  public class FormControlOptionValue
  {
    public int Id { get; set; }
    public int FormInstanceId { get; set; }
    public FormInstance FormInstance { get; set; }
    public int FormControlOptionId { get; set; }
    public FormControlOption FormControlOption { get; set; }
    public string Value { get; set; }
  }
}

