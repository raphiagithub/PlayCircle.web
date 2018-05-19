'use strict';

mainapp.factory('videoService', ['$http', 'localStorageService', function ($http, localStorageService) {
    var urlBase = window.location.origin + "/";
    var loginUrl = urlBase + "token";
    var categorySaveURL = urlBase + "api/Videos/SaveCategory";
    var categoryGetURL = urlBase + "api/Videos/GetAllCategories";
    var viewtypeSaveUrl = urlBase + "api/Videos/SaveViewType";
    var viewtypeGetURl = urlBase + "api/Videos/GetAllViewTypes";
    var videoServiceFactory = {};

    //-- Save video category --//
    videoServiceFactory.SaveCategory = function (categorymodel) {
        return $http.post(categorySaveURL, categorymodel).success(function (response) {
            return response;
        })
            .error(function (response) {
                return response;
            });
    };

    //-- Get All video category --//
    videoServiceFactory.GetVideoCategory = function () {
        return $http.get(categoryGetURL).success(function (response) {
            return response;
        })
            .error(function (response) {
                return response;
            });
    };

    //-- Save video videotypes --//
    videoServiceFactory.SaveViewType = function (viewtypemodel) {
        return $http.post(viewtypeSaveUrl, viewtypemodel).success(function (response) {
            return response;
        })
            .error(function (response) {
                return response;
            });
    };

    //-- Get All video videotypes--//
    videoServiceFactory.GetAllViewTypes = function () {
        return $http.get(viewtypeGetURl ).success(function (response) {
            return response;
        })
            .error(function (response) {
                return response;
            });
    };

    return videoServiceFactory;
}]);