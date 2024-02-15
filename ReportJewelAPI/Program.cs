using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ReportJewelAPI.Data;
using ReportJewelAPI.Data.Repositories;
using ReportJewelAPI.Data.Repositories.Interfaces;
using ReportJewelAPI.Entities;
using ReportJewelAPI.Interfaces;
using ReportJewelAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<DataContext>(opt =>
{
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddIdentityCore<User>(opt =>
{
    opt.Password.RequireNonAlphanumeric = false;
})
.AddRoles<Role>()
.AddRoleManager<RoleManager<Role>>()
.AddEntityFrameworkStores<DataContext>();

builder.Services.AddCors();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ILayoutRepository, LayoutRepository>();
builder.Services.AddScoped<IClientRepository, ClientRepository>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors(builder => builder
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials()
    .WithOrigins("http://localhost:4200"));
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
