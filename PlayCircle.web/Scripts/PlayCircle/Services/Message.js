'use strict';

mainapp.factory('messageService', function ($http, localStorageService) {
 
    var MessageServiceFactory = {};

    //-- Prompt failure message --//
    MessageServiceFactory.ShowFailedMessage = function (Header,Message) {
        swal(Header, Message, 'warning');
    };

    //-- Prompt success message --//
    MessageServiceFactory.ShowSuccessMessage = function (Header, Message) {
        swal(Header, Message, 'success');
    };


    
    return MessageServiceFactory;
});