using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ReportJewelAPI.Data.DTOs;
using ReportJewelAPI.Data.Repositories.Interfaces;

namespace ReportJewelAPI.Controllers
{
  public class UserController : BaseApiController
  {
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public UserController(
      IUserRepository userRepository,
      IMapper mapper
    )
    {
      _userRepository = userRepository;
      _mapper = mapper;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserDto>> GetUser(int id)
    {
      var user = await _userRepository.GetUserByIdAsync(id);
      var userDto = _mapper.Map<UserDto>(user);

      return userDto;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
      var user = await _userRepository.GetUserByUsernameAsync(loginDto.Username);

      if (user == null)
      {
        return Unauthorized("Invalid username");
      }

      return new UserDto
      {
        Id = user.Id,
        Username = user.Username,
        FirstName = user.FirstName,
        LastName = user.LastName,
        DateOfBirth = user.DateOfBirth,
        Email = user.Email
      };
    }
  }
}

