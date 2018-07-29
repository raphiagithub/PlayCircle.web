
var mainapp = angular.module('_mainApp', ['LocalStorageModule', 'ui.router', 'oc.lazyLoad', 'authapp']);


mainapp.controller('_mainCtrl', ['$scope', 'accountService', function ($scope, accountService) {
    $scope.GetLogedInUserInfo = function () {
        accountService.GetuserInfo().success(function (response) {
            // alert(JSON.stringify(response));
            $scope.FullName = response.FullName;
        })
            .error(function (response) {
                //  alert("User not loged in");
                //   location.href = '/Login.html';
            });
    };
}]);




mainapp.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
    function ($locationProvider, $stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/dashboard");


        $stateProvider
            .state('usersview', {
                url: "/users",
                templateUrl: '/Content/Partials/Users/_users.html',
                data: { pageTitle: 'Login' },
                controller: "userCtrl",
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: '_mainApp',
                            files: [
                                'Content/Styles/dataTables.bootstrap.min.css',
                                '/scripts/PlayCircle/Controllers/_userController.js',
                                '/scripts/PlayCircle/Services/AccountService.js',
                                'Scripts/jquery.dataTables.min.js',
                                'Scripts/dataTables.bootstrap.min.js'
                            ]
                        });
                    }]
                }
            })
            .state('catagory', {
                url: "/users",
                templateUrl: '/Content/Partials/Videos/Category.html',
                data: { pageTitle: 'Login' },
                controller: "videoController",
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: '_mainApp',
                            files: [
                                'Content/Styles/dataTables.bootstrap.min.css',
                                '/scripts/PlayCircle/Controllers/VideoController.js',
                                '/scripts/PlayCircle/Services/VideoService.js',
                                'Scripts/jquery.dataTables.min.js',
                                'Scripts/dataTables.bootstrap.min.js'
                            ]
                        });
                    }]
                }
            })
            .state('viewtype', {
                url: "/users",
                templateUrl: '/Content/Partials/Videos/ViewType.html',
                data: { pageTitle: 'Login' },
                controller: "videoController",
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: '_mainApp',
                            files: [
                                'Content/Styles/dataTables.bootstrap.min.css',
                                '/scripts/PlayCircle/Controllers/VideoController.js',
                                '/scripts/PlayCircle/Services/VideoService.js',
                                'Scripts/jquery.dataTables.min.js',
                                'Scripts/dataTables.bootstrap.min.js'
                            ]
                        });
                    }]
                }
            })
    }]);

/*mainapp.config(function ($stateProvider, $urlRouterProvider) {
   //$urlRouterProvider.otherwise("/home");
   $stateProvider
       .state('usersview', {
           url: '/ApplciationUsers',
           templateUrl: '/Content/Partials/Users/_users.html',
           data: {
               //root: 'this is root',
               //node: 'node',
               title: 'title'
               //header:'header'
           },
           controller: 'userCtrl',
           resolve: {
               deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                   return $ocLazyLoad.load(['/scripts/PlayCircle/Controllers/_userController.js']);
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
*/
mainapp.directive('contentPage', function () {
    return {
        restrict: 'A',
        // template: '<h>gabriel xavier</h>'
        templateUrl: '/Content/Partials/Theme/WrapperPage.html'
    }
});


