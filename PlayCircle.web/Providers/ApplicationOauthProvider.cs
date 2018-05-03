using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using Portal.PlayCircle.App_Start;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace Portal.PlayCircle.OAuth
{
    public class ApplicationOauthProvider: OAuthAuthorizationServerProvider
    {
        private readonly string _publicClientId;
        public ApplicationOauthProvider(string publicClientId)
        {
            if (publicClientId == null)
            {
                throw new ArgumentNullException("publicClientId");
            }

            _publicClientId = publicClientId;
        }



        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {

            //if (!context.OwinContext.Response.Headers.ContainsKey("Access-Control-Allow-Origin"))
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

            ApplicationUserManager userManager = context.OwinContext.GetUserManager<ApplicationUserManager>();

            DataEntity.EntityModels.USERINFO user = await userManager.FindAsync(context.UserName, context.Password);

            if (user == null)
            {
                context.SetError("invalid_grant", "The user name or password is incorrect.");
                return;
            }
            if (user.EmailConfirmed == false)
            {
                context.SetError("invalid_grant", "Your account is not activated. Please check your email for activation instructions.");
                return;
            }
            ClaimsIdentity oAuthIdentity = await user.GenerateUserIdentityAsync(userManager, OAuthDefaults.AuthenticationType);
            ClaimsIdentity cookiesIdentity = await user.GenerateUserIdentityAsync(userManager,
                CookieAuthenticationDefaults.AuthenticationType);
            // Add more custom claims here if you want. 

            oAuthIdentity.AddClaims(new[] {
                 new Claim(ClaimTypes.NameIdentifier,user.Id),
                 new Claim("UserId",user.Id)
            });
            AuthenticationProperties properties = new AuthenticationProperties(new Dictionary<string, string>
            {
                { "userName", user.UserName },
                //{ "fullname", user.full_name},
                { "fullname","Gabriel xavier"},
                //{"loginCount",user.LoginCount.ToString() },
                //{"PaidUser",user.IsPaid.ToString() }
            });
            AuthenticationTicket ticket = new AuthenticationTicket(oAuthIdentity, properties);

            context.Validated(ticket);
            context.Request.Context.Authentication.SignIn(cookiesIdentity);


        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            // Resource owner password credentials does not provide a client ID.
            if (context.ClientId == null)
            {
                context.Validated();
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientRedirectUri(OAuthValidateClientRedirectUriContext context)
        {
            if (context.ClientId == _publicClientId)
            {
                Uri expectedRootUri = new Uri(context.Request.Uri, "/");

                if (expectedRootUri.AbsoluteUri == context.RedirectUri)
                {
                    context.Validated();
                }
            }

            return Task.FromResult<object>(null);
        }

        public static AuthenticationProperties CreateProperties(string userName)
        {
            IDictionary<string, string> data = new Dictionary<string, string>
            {
                { "userName", userName }
            };
            return new AuthenticationProperties(data);
        }
    }
}