using Common.Providers.Email.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Portal.PlayCircle.Helpers
{
    public class EmailService : IIdentityMessageService
    {
        private string _emailAccount { get; set; }
        private string _emailPassword { get; set; }
        private string _emailFromAddress { get; set; }
        private string _emailSender { get; set; }
        private string smtpUsername { get; set; }
        private string smtpPassword { get; set; }
        public void SmptpCredentials(string username, string password)
        {
            smtpUsername = username;
            smtpPassword = password;
        }
        public EmailService()
        {
            _emailAccount = "softwarefeedback2014";
            _emailPassword = "morning1234";
            _emailFromAddress = "noreply@tspire.in";
            _emailSender = "Talentspire";
        }
        public static SmtpConfig SmptpConfiguration()
        {
            //var smtpconfig = SmtpConfig.GetConfigForMailGun("postmaster@sandbox255bd21b1b1841afa8223b7d3bcd4e49.mailgun.org", "b9b784945a476268282a9800ce5700fd");
            var smtpconfig = SmtpConfig.GetConfigForGmail("talentspirellp@gmail.com", "aeedc6ae#");
            return smtpconfig;
        }
        public async Task SendAsync(IdentityMessage message)
        {
            await configMailGunasync(message);
        }
        private async Task configMailGunasync(IdentityMessage message)
        {

            var smtpconfig = SmptpConfiguration();
            var email = new Email
            {
                FromAddress = _emailFromAddress,
                ToAddress = message.Destination,
                Subject = message.Subject,
                SenderName = _emailSender,
                Message = message.Body,
                IsHtmlEmail = true
            };
            var provider = new Common.Providers.Email.SmtpEmailProvider(smtpconfig);
            provider.Send(email);
            //  email.ToAddress = ConfigurationManager.AppSettings["devTestEmail"];
            // provider.Send(email);
        }

        /// <summary>
        /// Send Invoice PDF in mail
        /// </summary>
        /// <param name="to"></param>
        /// <param name="subject"></param>
        /// <param name="body"></param>
        /// <param name="data"></param>
        /// <param name="filename"></param>
        public void InvoiceMail(string to, string subject, string body, byte[] data, string filename)
        {

            var smtpconfig = SmptpConfiguration();
            var email = new Email
            {
                FromAddress = _emailFromAddress,
                ToAddress = to,
                Subject = subject,
                SenderName = _emailSender,
                Message = body,
                IsHtmlEmail = true,
                Attachments = new List<EmailAttachment>() { new EmailAttachment(data, filename) { } }
            };
            var provider = new Common.Providers.Email.SmtpEmailProvider(smtpconfig);
            provider.Send(email);
        }

    /*    public bool BulkPurchaseEmail(BulkPurcahseModel model)
        {
            try
            {
                var smtpconfig = SmptpConfiguration();
                var emailObj = new Email
                {
                    FromAddress = model.Email,
                    Subject = "Purchase Enquiry - " + model.Name,
                    ToAddress = ConfigurationManager.AppSettings["bulkPurchaseEmail"],
                    SenderName = _emailSender,
                    Message = GetBulkPurchaseEmailMessage(model),
                    IsHtmlEmail = true
                };
                var provider = new Common.Providers.Email.SmtpEmailProvider(smtpconfig);
                provider.Send(emailObj);
                emailObj.ToAddress = ConfigurationManager.AppSettings["devTestEmail"];
                provider.Send(emailObj);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        private string GetBulkPurchaseEmailMessage(BulkPurcahseModel model)
        {
            var _builder = new StringBuilder();
            _builder.Append("<span>Date and Time : </span> " + model.Date);
            _builder.Append("<br><span>User Name : </span> " + model.Name);
            _builder.Append("<br><span>Email Id : </span> " + model.Email);
            _builder.Append("<br><span>Phone No : </span> " + model.Phone);
            _builder.Append("<br><span>Comment : </span> " + model.Message);
            return _builder.ToString();
        }


        public bool ContactUsEmail(ContactModel model)
        {
            try
            {
                var smtpconfig = SmptpConfiguration();
                var emailObj = new Email
                {
                    FromAddress = model.Email,
                    Subject = "Contact Us",
                    ToAddress = ConfigurationManager.AppSettings["contactEmail"],
                    SenderName = model.FirstName + " " + model.LastName,
                    Message = GetContactUsEmailMessage(model),
                    IsHtmlEmail = true
                };
                var provider = new Common.Providers.Email.SmtpEmailProvider(smtpconfig);
                provider.Send(emailObj);
                emailObj.ToAddress = ConfigurationManager.AppSettings["devTestEmail"];
                provider.Send(emailObj);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        private string GetContactUsEmailMessage(ContactModel model)
        {
            var _builder = new StringBuilder();
            _builder.Append("<span>Date and Time : </span> " + model.Date);
            _builder.Append("<br><span>Name : </span> " + model.FirstName + " " + model.LastName);
            _builder.Append("<br><span>Email Id : </span> " + model.Email);
            _builder.Append("<br><span>Phone No : </span> " + model.Phone);
            //_builder.Append("<br><span>Contact Category : </span> " + model.ContactCategory);
            _builder.Append("<br><span>Comment : </span> " + model.Message);
            return _builder.ToString();
        }
        public bool ErrorThrowMailing(string exception, string controller)
        {
            try
            {
                var smtpconfig = SmptpConfiguration();
                var emailObj = new Email
                {
                    FromAddress = _emailFromAddress,
                    Subject = "Purchase Enquiry Exception from " + controller,
                    ToAddress = ConfigurationManager.AppSettings["devTestEmail"],
                    SenderName = _emailSender,
                    Message = exception,
                    IsHtmlEmail = true
                };
                var provider = new Common.Providers.Email.SmtpEmailProvider(smtpconfig);
                provider.Send(emailObj);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }  */

       async Task IIdentityMessageService.SendAsync(IdentityMessage message)
        {
            await configMailGunasync(message);
        }
    }
}
