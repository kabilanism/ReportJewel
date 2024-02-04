﻿namespace SimpleBookAPI.Data.DTOs
{
  public class FormDto
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public IEnumerable<FormControlDto> Controls { get; set; }
  }
}

