using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

namespace BabyHawkHelperServer
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {
            Response.AddHeader("Access-Control-Allow-Origin", "*");
            if (Context.Request.HttpMethod.Equals("OPTIONS"))
            {
                Response.AddHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
                Response.AddHeader(
                    "Access-Control-Allow-Headers",
                    "Origin, X-Requested-With, Content-Type, Accept"
                );
                Response.StatusCode = (int)System.Net.HttpStatusCode.OK;
                Context.ApplicationInstance.CompleteRequest();
            }
        }
    }


}
