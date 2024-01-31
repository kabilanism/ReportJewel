using AutoMapper;
using SimpleBookAPI.Data.DTOs;
using SimpleBookAPI.Entities;

namespace SimpleBookAPI.Helpers
{
  public class AutoMapperProfiles : Profile
  {
    public AutoMapperProfiles()
    {
      CreateMap<User, UserDto>();
      CreateMap<Form, FormDto>();
      CreateMap<Client, ClientDto>();
    }
  }
}

