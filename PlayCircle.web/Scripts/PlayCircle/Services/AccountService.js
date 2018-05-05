'use strict';

mainapp.factory('accountService', ['$http' , function ($http ) {

    var urlBase = window.location.origin + "/";
    var loginUrl = urlBase + "token";
    var registerUrl = urlBase + "api/Accounts/RegisterUser";
    var userInfoUrl = urlBase + "api/Account/GetCurrentUserInfo";
    var updateUserInfoUrl = urlBase + "api/Account/UpdateUserInfo";
    var forgotPasswordUrl = urlBase + "api/Account/ForgotPassword";
    var logOutUrl = urlBase + "api/Account/Logout";
    var accountServiceFactory = {};

    accountServiceFactory.registerUser = function (model) {
        return $http.post(registerUrl, model).success(function (response) {
            return response;
        })
            .error(function (response) {
                return response;
            });
    };

    return  accountServiceFactory ;
}]);