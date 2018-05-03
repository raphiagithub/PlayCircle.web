using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security.DataProtection;
using PlayCircle.web.Models;
using Portal.PlayCircle.App_Start;
using Portal.PlayCircle.DataEntity.EntityModels;
using Portal.PlayCircle.Helpers;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace PlayCircle.web.Api
{
    public class AccountsController : ApiController
    {

        private ApplicationUserManager _userManager;

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IHttpActionResult> RegisterUser(RegisterModel registermodel)
        {
 
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var user = new USERINFO()
                {
                    //full_name = "Gabriel xavier",
                    UserName = registermodel.UserName,
                    Email = registermodel.Email,
                    EmailConfirmed = false,
                    PhoneNumber = registermodel.MobileNo
                };
                IdentityResult result = await UserManager.CreateAsync(user, "New user");
                if (result.Succeeded)
                {
                    var provider = new DpapiDataProtectionProvider("TalentSpire");
                    UserManager.EmailService = new EmailService();

                    //IHttpActionResult errorResult = GetErrorResult(result);
                    string code = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);

                    var newRouteValues = new System.Web.Routing.RouteValueDictionary(new { userId = user.Id, code = code })
                {
                    {"httproute", true}
                };
                    System.Web.Mvc.UrlHelper urlHelper = new System.Web.Mvc.UrlHelper(System.Web.HttpContext.Current.Request.RequestContext, System.Web.Routing.RouteTable.Routes);
                    var callbackUrl = urlHelper.Action("ConfirmEmail", "Account", newRouteValues, System.Web.HttpContext.Current.Request.Url.Scheme);
                    var body = CreateMailBody(callbackUrl, "Gabriel xavier");
                    await UserManager.SendEmailAsync(user.Id,
                        "Welcome to Talentspire - Confirm account", body);
                    Uri locationHeader = new Uri(Url.Link("GetUserById", new { id = user.Id }));
                    return Ok();
                }
                else
                {
                    return GetErrorResult(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.ToString());
            }
        }

        private string CreateMailBody(string callbackUrl, string username)
        {
            //var baseUrl = ConfigurationManager.AppSettings["Webapibase"].Replace("api/", ""); http://localhost:53170
            var baseUrl = "http://localhost:53170";
            var logo = baseUrl + "/content/images/logo-talentspire.png";
            StringBuilder _subject = new StringBuilder();
            _subject.Append("<table width='600' border='0' cellspacing='0' cellpadding='0' align='center' bgcolor='#ffffff'><tr><td><img src='" + logo + "' alt='TALENTSPIRE' title='TALENTSPIRE' style='display:block'/></td></tr><tr><td height='2' align='center' bgcolor='#00cee0' style='line-height:2px;'>&nbsp;</td></tr><tr><td>");
            _subject.Append("<table border='0' width='600' cellspacing='0' cellpadding='0' align='center' bgcolor='#ffffff'><tbody><tr><td width='30'>&nbsp;</td><td style='text-align:left;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:20px;color:#282828;'align='left' bgcolor='#ffffff' width='540'><br/><strong>Dear " + username + ",</strong><br/><br/>Thank you for registering with us and thus having taken the first step towards an enhanced level of learning. Welcome to the Talentspire family and to an exciting world of learning with the support of a host of educational resources and professionals.<br/><br/>Please click on the link below to login: <br/><br/> <a href='" + callbackUrl + "'>Confirm Account</a><br/><br/>Please note that you will be required to change the password after logging in.<br/><br/> Thanks and Regards,<br/>Talentspire Team<br/><br/><u><b>Contact us info</b></u><br>7550068861<br>sales@tspire.in<br>PLOT MIG 329, 8th Main Road, Nolambur, Chennai, Tamil Nadu, India PIN 600037 </td><td width='30'>&nbsp;</td></tr></tbody></table>");
            _subject.Append("</td></tr><tr><td style='font-size:12px; line-height:16px;color:#d3cccc;text-align:center;font-family:Arial,Helvetica,sans-serif;' bgcolor='#414042' align='center'><br/>");
            _subject.Append("<table width='500' border='0' cellspacing='0' cellpadding='0' align='center'><tr><td>2017 &copy; Talentspire. All Rights Reserved | <a href='http://tspire.in' target='_blank' style='font-size:12px; color:#d3cccc; text-decoration:none; '>www.tspire.in</a></td></tr></table><br /></td></tr><tr><td height='10' align='center' bgcolor='#00cee0'>&nbsp;</td></tr></table>");
            return _subject.ToString();
        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        if (!error.StartsWith("Name"))
                            ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }
    }
}