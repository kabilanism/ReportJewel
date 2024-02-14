﻿using System.ComponentModel.DataAnnotations;

namespace ReportJewelAPI.Entities
{
  public class Layout
  {
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    public string Description { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public ICollection<LayoutControl> LayoutControls { get; set; }
  }
}

