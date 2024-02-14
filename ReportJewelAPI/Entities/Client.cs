using System.ComponentModel.DataAnnotations;

namespace ReportJewelAPI.Entities
{
  public class Client
  {
    public int Id { get; set; }
    [Required]
    public int UserId { get; set; }
    public User User { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string Address { get; set; }
    [Required]
    public string Email { get; set; }
  }
}

