using AutoMapper;
using ReportJewelAPI.Data.DTOs;
using ReportJewelAPI.Entities;

namespace ReportJewelAPI.Helpers
{
  public class AutoMapperProfiles : Profile
  {
    public AutoMapperProfiles()
    {
      CreateMap<User, UserDto>();
      CreateMap<Layout, LayoutDto>()
        .ForMember(dest => dest.Controls, opt => opt.MapFrom(src => src.LayoutControls));
      CreateMap<LayoutUpdateDto, Layout>();
      CreateMap<LayoutControl, LayoutControlDto>();
      CreateMap<LayoutControlDto, LayoutControl>();
      CreateMap<LayoutControlAddDto, LayoutControl>();
      CreateMap<Client, ClientDto>();
    }
  }
}

