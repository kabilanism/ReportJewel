using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReportJewelAPI.Data.DTOs;
using ReportJewelAPI.Data.Repositories.Interfaces;
using ReportJewelAPI.Entities;
using ReportJewelAPI.Interfaces;

namespace ReportJewelAPI.Controllers
{
  public class UserController : BaseApiController
  {
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly ITokenService _tokenService;
    private readonly UserManager<User> _userManager;

    public UserController(
      UserManager<User> userManager,
      IUserRepository userRepository,
      IMapper mapper,
      ITokenService tokenService
    )
    {
      _userManager = userManager;
      _userRepository = userRepository;
      _mapper = mapper;
      _tokenService = tokenService;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserDto>> GetUser(int id)
    {
      var user = await _userRepository.GetUserByIdAsync(id);
      var userDto = _mapper.Map<UserDto>(user);

      return userDto;
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
      if (await UserExists(registerDto.UserName))
      {
        return BadRequest("Username is taken.");
      }

      var user = _mapper.Map<User>(registerDto);

      user.UserName = registerDto.UserName.ToLower();

      var result = await _userManager.CreateAsync(user, registerDto.Password);

      if (!result.Succeeded)
      {
        return BadRequest(result.Errors);
      }

      var roleResult = await _userManager.AddToRoleAsync(user, "Member");

      if (!roleResult.Succeeded)
      {
        return BadRequest(result.Errors);
      }

      return new UserDto
      {
        Username = user.UserName,
        Token = await _tokenService.CreateToken(user),
        FirstName = user.FirstName,
        LastName = user.LastName,
        DateOfBirth = user.DateOfBirth,
        Email = user.Email
      };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
      var user = await _userManager.Users
        .SingleOrDefaultAsync(u => u.UserName == loginDto.Username);

      if (user == null)
      {
        return Unauthorized("Invalid username.");
      }

      var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

      if (!result)
      {
        return Unauthorized("Invalid password.");
      }

      return new UserDto
      {
        Id = user.Id,
        Username = user.UserName,
        FirstName = user.FirstName,
        LastName = user.LastName,
        Token = await _tokenService.CreateToken(user),
        DateOfBirth = user.DateOfBirth,
        Email = user.Email
      };
    }

    private async Task<bool> UserExists(string username)
    {
      return await _userManager.Users.AnyAsync(user => user.UserName == username.ToLower());
    }
  }
}

