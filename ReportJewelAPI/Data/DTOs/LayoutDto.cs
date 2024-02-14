namespace ReportJewelAPI.Data.DTOs
{
  public class LayoutDto
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public IEnumerable<LayoutControlDto> Controls { get; set; }
  }
}

