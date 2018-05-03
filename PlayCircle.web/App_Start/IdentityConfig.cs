﻿using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Portal.PlayCircle.DataEntity.DBContext;
using Portal.PlayCircle.DataEntity.EntityModels;

 

namespace Portal.PlayCircle.App_Start
{
    public class ApplicationUserManager :UserManager<USERINFO>
    {
        public ApplicationUserManager(IUserStore<USERINFO> store)
            : base(store)
        {
        }

        public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            var manager = new ApplicationUserManager(new UserStore<USERINFO>(context.Get<PlayCircleDBContext>()));
            // Configure validation logic for usernames
            manager.UserValidator = new UserValidator<USERINFO>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };
            // Configure validation logic for passwords
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = false,
                RequireDigit = false,
                RequireLowercase = false,
                RequireUppercase = false,
            };
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider = new DataProtectorTokenProvider<USERINFO>(dataProtectionProvider.Create("ASP.NET Identity"));
            }
            return manager;
        }
    }
}