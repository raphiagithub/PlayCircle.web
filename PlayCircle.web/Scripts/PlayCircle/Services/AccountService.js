'use strict';

authenticationapp.factory('accountService', ['$http', 'localStorageService', function ($http, localStorageService) {

    var urlBase = window.location.origin + "/";
    var loginUrl = urlBase + "token";
    var registerUrl = urlBase + "api/Accounts/RegisterUser";
    var checkAdminExistancy = urlBase + "api/Accounts/CheckAdminExistancy";
    var userInfoUrl = urlBase + "api/Accounts/GetuserInfo";

    var updateUserInfoUrl = urlBase + "api/Account/UpdateUserInfo";
    var forgotPasswordUrl = urlBase + "api/Account/ForgotPassword";
    var logOutUrl = urlBase + "api/Account/Logout";
    var accountServiceFactory = {};

    //-- Check if admin user exist or not --//
    accountServiceFactory.CheckAdminExistancy = function () {
        return $http.get(checkAdminExistancy).success(function (response) {
            return response;
        })
            .error(function (response) {
                return response;
            });
    };


    //-- Register new user --//
    accountServiceFactory.registerUser = function (model) {
        return $http.post(registerUrl, model).success(function (response) {
            return response;
        })
            .error(function (response) {
                return response;
            });
    };

    //-- Login user --//
    accountServiceFactory.loginUser = function (model) {
        var data = "grant_type=password&username=" + model.UserName + "&password=" + model.Password;
        data = data + "&client_id=ngAuthApp";
        //accountServiceFactory.logOut();
        return $http.post(loginUrl, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
            if (response.access_token) {
                localStorageService.set('authorizationData', { token: response.access_token, userName: model.userName, refreshToken: response.refresh_token, useRefreshTokens: true });
                return response;
            }
        })
            .error(function (response) {
                return response;
            });
    };

    //-- Login user --//
    accountServiceFactory.GetuserInfo = function () {
        return $http.get(userInfoUrl).success(function (response) {
                return response;
        })
            .error(function (response) {
                return response;
            });
    };

    return accountServiceFactory;
}]);