using Microsoft.EntityFrameworkCore;
using SimpleBookAPI.Data;
using SimpleBookAPI.Data.Repositories;
using SimpleBookAPI.Data.Repositories.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<DataContext>(opt =>
{
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IFormRepository, FormRepository>();
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
