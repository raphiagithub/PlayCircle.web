
var mainapp = angular.module('playcircleApp', ['LocalStorageModule','ui.router', 'oc.lazyLoad']);


mainapp.controller('placirclerController', ['$scope', function ($scope) {

}]);

mainapp.config(function ($stateProvider, $urlRouterProvider) {
    //$urlRouterProvider.otherwise("/home");
    $stateProvider
        .state('home', {
            url: '/home',
            //templateUrl: '/Contents/Partials/LoginPage.html',
            templateUrl: '/Content/Partials/Users/Users.html',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        //insertBefore: '#ng_load_plugins_before',
                        files: ['/Content/Styles/dataTables.bootstrap.min.css',
                            '/Scripts/jquery.dataTables.min.js',
                            '/Scripts/dataTables.bootstrap.min.js'
                        ]
                    });
                }]
            }
        })
});

mainapp.directive('contentPage', function () {
    return {
        restrict: 'A',
        // template: '<h>gabriel xavier</h>'
        templateUrl: '/Content/Partials/Theme/WrapperPage.html'
    }
});
