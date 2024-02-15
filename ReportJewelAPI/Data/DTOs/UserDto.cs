namespace ReportJewelAPI.Data.DTOs
{
  public class UserDto
  {
    public string Username { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateOnly DateOfBirth { get; set; }
    public string Email { get; set; }
    public string Token { get; set; }
  }
}

