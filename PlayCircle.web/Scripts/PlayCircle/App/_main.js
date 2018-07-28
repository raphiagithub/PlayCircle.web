
var mainapp = angular.module('_mainApp', ['LocalStorageModule', 'ui.router', 'oc.lazyLoad', 'ngProgress', 'authapp']);


mainapp.controller('_mainCtrl', ['$scope', 'accountService', function ($scope, accountService) {
    $scope.GetLogedInUserInfo = function () {
        accountService.GetuserInfo().success(function (response) {
            $scope.FullName = response.FullName;
        })
            .error(function (response) {
                alert("error" + JSON.stringify(response));
            });
    };
}]);


mainapp.config(function ($stateProvider, $urlRouterProvider) {
    //$urlRouterProvider.otherwise("/home");
    $stateProvider
        .state('hello', {
            url: '/ApplciationUsers',
            templateUrl: '/Content/Partials/Index.html',
            data: {},
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        //insertBefore: '#ng_load_plugins_before',
                        files: [
                            '/Content/Styles/test.css',
                            '/scripts/test.js'
                        ]
                    });
                }]
            }
        })
        .state('hello1', {
            url: '/ApplciationUsers',
            templateUrl: '/Content/Partials/ss.html',
            data: {},
            resolve: {
                //deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                //    return $ocLazyLoad.load({
                //        insertBefore: '#ng_load_plugins_before',
                //        files: ['/scripts/test.js'
                //        ]
                //    });
                //}]
            }
        })
        .state('home', {
            url: '/ApplciationUsers',
            templateUrl: '/Content/Partials/Users/Users.html',
            data: {},
            //resolve: {
            //    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
            //        return $ocLazyLoad.load({
            //            //insertBefore: '#ng_load_plugins_before',
            //            files: ['/Content/Styles/dataTables.bootstrap.min.css',
            //                '/Content/Styles/select2.min.css',
            //                '/Scripts/jquery.dataTables.min.js',
            //                '/Scripts/dataTables.bootstrap.min.js',
            //                '/Scripts/select2.full.min.js',
            //                '/Scripts/JavaScript.js',
            //            ]
            //        });
            //    }]
            //}
        })
        .state('category', {
            url: '/VideoCategory',
            controller: 'videoController',
            templateUrl: '/Content/Partials/Videos/Category.html',
            data: {}
        })
        .state('viewtype', {
            url: '/ViewType',
            controller: 'videoController',
            templateUrl: '/Content/Partials/Videos/ViewType.html',
            data: {}
        })
});

mainapp.directive('contentPage', function () {
    return {
        restrict: 'A',
        // template: '<h>gabriel xavier</h>'
        templateUrl: '/Content/Partials/Theme/WrapperPage.html'
    }
});
