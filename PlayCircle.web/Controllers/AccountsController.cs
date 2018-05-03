using Portal.PlayCircle.DataEntity.DBContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PlayCircle.web.Controllers
{
    public class AccountsController : Controller
    {
        // GET: Accounts
        public ActionResult Index()
        {
            PlayCircleDBContext sdf = new PlayCircleDBContext();
            sdf.Users.ToList();
            return View();
        }

        public ActionResult Authentication()
        {

            return View();
        }
    }
}