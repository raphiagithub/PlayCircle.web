using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace Portal.PlayCircle.DataEntity.EntityModels
{
    public class USERINFO : IdentityUser
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<USERINFO> manager, string authenticationType)
        {
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);

            return userIdentity;
        }

        public int application_id { get; set; }
        public string full_name { get; set; }
        //public int gender { get; set; }
        //public string display_name { get; set; }
        //public int isverified_mobileno { get; set; }
        //public string email { get; set; }
        //public int isverified_email { get; set; }
        //public string profile_photo { get; set; }
        //public Nullable<System.DateTime> birthday { get; set; }
        //public System.DateTime account_created_date { get; set; }
        //public int islogedin { get; set; }
        //public int isapproved { get; set; }
        //public int isdeleted { get; set; }
        //public string user_name { get; set; }
        //public string password { get; set; }
        //public Nullable<int> user_type { get; set; }

    }
}