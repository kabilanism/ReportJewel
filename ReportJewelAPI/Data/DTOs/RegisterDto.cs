using System.ComponentModel.DataAnnotations;

namespace ReportJewelAPI.Data.DTOs
{
  public class RegisterDto
  {
    [Required] public string UserName { get; set; }
    [Required] public string FirstName { get; set; }
    [Required] public string LastName { get; set; }

    [Required] public DateOnly? DateOfBirth { get; set; }
    [Required]
    [StringLength(8, MinimumLength = 4)]
    public string Password { get; set; }
  }
}

