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
      CreateMap<Form, FormDto>()
        .ForMember(dest => dest.Controls, opt => opt.MapFrom(src => src.FormControls));
      CreateMap<FormControl, FormControlDto>();
      CreateMap<Client, ClientDto>();
    }
  }
}

