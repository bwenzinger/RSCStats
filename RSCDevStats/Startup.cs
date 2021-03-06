using Google.Apis.Sheets.v4;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Server.IISIntegration;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using RSCWebApi;
using System;
using Microsoft.AspNet.Identity;

namespace RSCDevStats
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //var serverVersion = ServerVersion.AutoDetect(Configuration.GetConnectionString("DefaultConnection"));

            //// Replace 'YourDbContext' with the name of your own DbContext derived class.
            //services.AddDbContext<EntityFrameworkDatabaseContext>(
            //    dbContextOptions => dbContextOptions
            //        .UseMySql(Configuration.GetConnectionString("DefaultConnection"), serverVersion)
            //        .EnableSensitiveDataLogging() // <-- These two calls are optional but help
            //        .EnableDetailedErrors()       // <-- with debugging (remove for production).
            //);

            services.AddAuthentication("BasicAuthentication")
                .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>("BasicAuthentication", null);
                //.AddCookie(DefaultAuthenticationTypes.ApplicationCookie, options =>
                //{

                //    options.LoginPath = "/Login";
                //    options.LogoutPath = "/Logout";
                //}); ;

            services.AddMvc()
                .AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);

            //services.Add(new ServiceDescriptor(typeof(DatabaseContext), new DatabaseContext(Configuration.GetConnectionString("DefaultConnection"))));
            //services.AddDbContext<EntityFrameworkDatabaseContext>(options =>
            //    options.UseMySql(connectionString: Configuration.GetConnectionString("DefaultConnection")));

            //init the entity framework models
            using (var db = new EntityFrameworkDatabaseContext(Configuration))
            {
                //db.Database.Migrate();
                db.Database.EnsureCreated();
            }

            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "RSCDevStats", Version = "v1" });
            });

            //services.AddScoped< new SheetsService(new BaseClientService.Initializer()
            //{
            //    HttpClientInitializer = credential,
            //    ApplicationName = _applicationName
            //}) > ();

            

            //services.AddAuthorization(options =>
            //{
            //    options.AddPolicy("BasicAuthentication", new AuthorizationPolicyBuilder("BasicAuthentication").RequireAuthenticatedUser().Build());
            //});

            services.AddScoped<IUserService, UserService>();


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "RSCDevStats v1"));
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();


            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
