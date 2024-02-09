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
      CreateMap<FormUpdateDto, Form>();
      CreateMap<FormControl, FormControlDto>();
      CreateMap<FormControlDto, FormControl>();
      CreateMap<Client, ClientDto>();
    }
  }
}

