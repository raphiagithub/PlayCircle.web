using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Portal.PlayCircle.DataEntity.DBContext;
using Portal.PlayCircle.DataEntity.EntityModels;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace PlayCircle.web.DataEntity.DBContext
{
    public class Seeder : CreateDatabaseIfNotExists<PlayCircleDBContext>
    {
        protected override void Seed(PlayCircleDBContext context)
        {
            Initialize(context);
            base.Seed(context);
        }

        public void Initialize(PlayCircleDBContext context)
        {
            try
            {
                var userManager = new UserManager<USERINFO>(new UserStore<USERINFO>(context));
                userManager.UserValidator = new UserValidator<USERINFO>(userManager)
                {
                    AllowOnlyAlphanumericUserNames = false
                };
                var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));


                if (!roleManager.RoleExists("Admin"))
                {
                    roleManager.Create(new IdentityRole("Admin"));
                }

                if (!roleManager.RoleExists("Member"))
                {
                    roleManager.Create(new IdentityRole("Member"));
                }


                /*var user = new ApplicationUser()
                {
                    Email = "nair.athul1992@gmail.com",
                    UserName = "nair.athul1992@gmail.com",
                    FirstName = "Athul",
                    LastName = "Nair",
                    EmailConfirmed = true

                };
                var user1 = new ApplicationUser()
                {
                    Email = "talentadmin@gmail.com",
                    UserName = "talentadmin@gmail.com",
                    FirstName = "Talent",
                    LastName = "Spire",
                    EmailConfirmed = true

                };

                var userResult = userManager.Create(user, "Admin@123");
                var userResult1 = userManager.Create(user1, "Admin@123");
                if (userResult.Succeeded)
                {
                    userManager.AddToRole<ApplicationUser, string>(user.Id, "Admin");
                    userManager.AddToRole<ApplicationUser, string>(user1.Id, "Admin");
                }

              

                #region Transaction Status Feed
                if (!context.TransactionStatuses.Any(p => p.Id == (int)EnumTransactionStatus.Created))
                {
                    context.TransactionStatuses.Add(new TransactionStatus() { Name = Convert.ToString(EnumTransactionStatus.Created), Description = Convert.ToString(EnumTransactionStatus.Created) });
                    context.SaveChanges();
                }

                if (!context.TransactionStatuses.Any(p => p.Id == (int)EnumTransactionStatus.Success))
                {
                    context.TransactionStatuses.Add(new TransactionStatus() { Name = Convert.ToString(EnumTransactionStatus.Success), Description = Convert.ToString(EnumTransactionStatus.Success) });
                    context.SaveChanges();
                }

                if (!context.TransactionStatuses.Any(p => p.Id == (int)EnumTransactionStatus.Failed))
                {
                    context.TransactionStatuses.Add(new TransactionStatus() { Name = Convert.ToString(EnumTransactionStatus.Failed), Description = Convert.ToString(EnumTransactionStatus.Failed) });
                    context.SaveChanges();
                }
                #endregion
                #region Invoice Type Feed

                if (!context.InvoiceTypes.Any(p => p.Id == (int)EnumInvoiceType.Auto))
                {
                    context.InvoiceTypes.Add(new InvoiceType() { Name = Convert.ToString(EnumInvoiceType.Auto), Description = Convert.ToString(EnumInvoiceType.Auto) });
                    context.SaveChanges();
                }

                if (!context.InvoiceTypes.Any(p => p.Id == (int)EnumInvoiceType.Manual))
                {
                    context.InvoiceTypes.Add(new InvoiceType() { Name = Convert.ToString(EnumInvoiceType.Manual), Description = Convert.ToString(EnumInvoiceType.Manual) });
                    context.SaveChanges();
                }

                #endregion
                */

                context.Commit();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

    }
}