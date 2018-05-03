using System;
using System.Data.Entity;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using Portal.PlayCircle.DataEntity.DBContext;

[assembly: OwinStartup(typeof(PlayCircle.web.Startup))]
//[assembly: OwinStartupAttribute("placyConfig",typeof(PlayCircle.web.Startup))]


namespace PlayCircle.web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            Database.SetInitializer(new DropCreateDatabaseIfModelChanges<PlayCircleDBContext>());

           // var mappingDefinitions = new MappingDefinitions();
           // mappingDefinitions.Initialise();

            //FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            //RouteConfig.RegisterRoutes(RouteTable.Routes);
            //BundleConfig.RegisterBundles(BundleTable.Bundles);
            //AreaRegistration.RegisterAllAreas();

            //var config = new HttpConfiguration();
            //config.MapHttpAttributeRoutes();

            //WebApiConfig.Register(config);

            //new WebCapsule().Initialise(config);

            //app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);

            //config.EnableSwagger(c =>
            //{
            //    c.SingleApiVersion("Api V1", "Talent Spire");
            //    c.IncludeXmlComments(GetXmlCommentsPath());
            //}).EnableSwaggerUi();

            //app.UseWebApi(config);
        }
    }
}
