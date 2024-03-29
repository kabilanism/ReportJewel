﻿namespace ReportJewelAPI.Helpers
{
  public class UserParams
  {
    public int UserId { get; set; }
    private const int MaxPageSize = 50;
    public int PageNumber { get; set; } = 1;
    private int _pageSize = 10;
    public int PageSize
    {
      get => _pageSize;
      set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
    }
  }
}


