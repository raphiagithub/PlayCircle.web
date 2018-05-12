
var mainapp = angular.module('playcircleApp', ['LocalStorageModule', 'ui.router', 'oc.lazyLoad','ngProgress']);


mainapp.controller('placirclerController', ['$scope', 'accountService', function ($scope, accountService) {

    $scope.GetLogedInUserInfo = function () {
        accountService.GetuserInfo().success(function (response) {
            $scope.FullName = response.FullName;
        })
            .error(function (response) {
                alert("error" + JSON.stringify(response));
            });
    }


}]);

mainapp.config(function ($stateProvider, $urlRouterProvider) {
    //$urlRouterProvider.otherwise("/home");
    $stateProvider
        .state('home', {
            url: '/home',
            //templateUrl: '/Contents/Partials/LoginPage.html',
            templateUrl: '/Content/Partials/Users/Users.html',
            data: function () {
                return { name: 'gabriel' }
            },
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        //insertBefore: '#ng_load_plugins_before',
                        files: ['/Content/Styles/dataTables.bootstrap.min.css',
                            '/Content/Styles/select2.min.css',
                            '/Scripts/jquery.dataTables.min.js',
                            '/Scripts/dataTables.bootstrap.min.js',
                            '/Scripts/select2.full.min.js',
                            '/Scripts/JavaScript.js',
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
