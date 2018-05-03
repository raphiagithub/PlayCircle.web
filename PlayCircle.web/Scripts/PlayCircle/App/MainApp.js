
var mainapp = angular.module('playcircleApp', ['ui.router', 'oc.lazyLoad']);


mainapp.controller('placirclerController', ['$scope', function ($scope) {
    $scope.test = function () {
        alert('working');
    }
}]);

mainapp.config(function ($stateProvider, $urlRouterProvider) {
    //$urlRouterProvider.otherwise("/home");
    $stateProvider
        .state('home', {
            url: '/home',
            //templateUrl: '/Contents/Partials/LoginPage.html',
            templateUrl: '/Content/Partials/Theme/Header.html',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        //insertBefore: '#ng_load_plugins_before',
                        files: ['/Scripts/adminlte.min.js']
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
