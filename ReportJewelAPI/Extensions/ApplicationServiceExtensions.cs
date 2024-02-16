using Microsoft.EntityFrameworkCore;
using ReportJewelAPI.Data;
using ReportJewelAPI.Data.Repositories;
using ReportJewelAPI.Data.Repositories.Interfaces;
using ReportJewelAPI.Interfaces;
using ReportJewelAPI.Services;

namespace ReportJewelAPI.Extensions
{
  public static class ApplicationServiceExtensions
  {
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
      services.AddDbContext<DataContext>(opt =>
      {
        opt.UseNpgsql(config.GetConnectionString("DefaultConnection"));
      });

      services.AddCors();
      services.AddScoped<IUserRepository, UserRepository>();
      services.AddScoped<ILayoutRepository, LayoutRepository>();
      services.AddScoped<ITokenService, TokenService>();
      services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

      return services;
    }
  }

}

