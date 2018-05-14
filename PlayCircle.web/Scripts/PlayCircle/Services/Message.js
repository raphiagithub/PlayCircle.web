'use strict';

mainapp.factory('messageService', function ($http, localStorageService) {
 
    var MessageServiceFactory = {};

    //-- Prompt failure message --//
    MessageServiceFactory.ShowFailedMessage = function (Header,Message) {
        swal(Header, Message, 'warning');
    };


    
    return MessageServiceFactory;
});