'use strict';

mainapp.factory('eventService', ['$http', 'localStorageService', function ($http, localStorageService) {
    var urlBase = window.location.origin + "/";
    var loginUrl = urlBase + "token";
    var bindEventURL = urlBase + "api/Event/BindCategoryAndEvents";
    var saveEventURL = urlBase + "api/Event/CreateEvent";
    var getEventsURL = urlBase + "api/Event/FetchAllEvents";
    var eventServiceFactory = {};

    //-- Bind category --//
    eventServiceFactory.BindEvents = function () {
        return $http.get(bindEventURL).success(function (response) {
            return response;
        })
            .error(function (response) {
                return response;
            });
    };

    //-- Create new event --/
    eventServiceFactory.CreateNewEvent = function (eventModel) {
        return $http.post(saveEventURL,eventModel).success(function (response) {
            return response;
        })
            .error(function (response) {
                return response;
            });
    };

    //-- Create new event --/
    eventServiceFactory.GetAllEvents = function () {
        return $http.get(getEventsURL).success(function (response) {
            return response;
        })
            .error(function (response) {
                return response;
            });
    };

    return eventServiceFactory;
}]);