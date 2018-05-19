'use strict';

mainapp.factory('videoService', ['$http', 'localStorageService', function ($http, localStorageService) {
    var urlBase = window.location.origin + "/";
    var loginUrl = urlBase + "token";
    var categorySaveURL = urlBase + "api/Videos/SaveCategory"; 
    var categoryGetURL = urlBase + "api/Videos/GetAllCategories"; 
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

    return videoServiceFactory;
}]);