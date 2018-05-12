'use strict';

mainapp.factory('messageService', function ($http, localStorageService) {

    //var urlBase = window.location.origin + "/";
    //var loginUrl = urlBase + "token";
    //var registerUrl = urlBase + "api/Accounts/RegisterUser";
    //var CheckAdminExistancy = urlBase + "api/Accounts/CheckAdminExistancy";
    //var userInfoUrl = urlBase + "api/Accounts/GetuserInfo";

    //var updateUserInfoUrl = urlBase + "api/Account/UpdateUserInfo";
    //var forgotPasswordUrl = urlBase + "api/Account/ForgotPassword";
    //var logOutUrl = urlBase + "api/Account/Logout";
    var MessageServiceFactory = {};

    //-- Check if admin user exist or not --//
    MessageServiceFactory.CheckAdminExistancy = function (Header,Message,style) {
        swal(Header, Message, style);
    };


    
    return MessageServiceFactory;
});