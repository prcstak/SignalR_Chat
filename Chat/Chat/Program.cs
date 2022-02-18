using Chat;
using Chat.Data;
using Chat.Hubs;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddSignalR();
builder.Services.AddDbContext<ApplicationContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddIdentity<User, IdentityRole>(opts => { opts.Password.RequireNonAlphanumeric = false; })
    .AddEntityFrameworkStores<ApplicationContext>();
builder.Services.AddSingleton<Mock, Mock>();
var app = builder.Build();

app.UseDeveloperExceptionPage();
app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();
 
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapHub<ChatHub>("/chat");
app.MapRazorPages();
app.Run();