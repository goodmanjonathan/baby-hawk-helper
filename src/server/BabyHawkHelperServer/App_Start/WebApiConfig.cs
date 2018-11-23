using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace BabyHawkHelperServer
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "StudentApi",
                routeTemplate: "api/{controller}/{action}"
            );

            config.EnableCors();
        }
    }
}
