﻿using System.ComponentModel.DataAnnotations;

namespace ReportJewelAPI.Entities
{
  public class LayoutControl
  {
    public int Id { get; set; }
    public int LayoutId { get; set; }
    public Layout Layout { get; set; }
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

