using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using ReportJewelAPI.Data;
using ReportJewelAPI.Entities;

namespace ReportJewelAPI.Extensions
{
  public static class IdentityServiceExtensions
  {
    public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
    {
      services.AddIdentityCore<User>(opt =>
      {
        opt.Password.RequireNonAlphanumeric = false;
      })
      .AddRoles<Role>()
      .AddRoleManager<RoleManager<Role>>()
      .AddEntityFrameworkStores<DataContext>();

      services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
      {
        options.TokenValidationParameters = new TokenValidationParameters
        {
          ValidateIssuerSigningKey = true,
          IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"])),
          ValidateIssuer = false,
          ValidateAudience = false
        };
      });

      return services;
    }
  }

}

