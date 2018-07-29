'use strict';

(function () {
    angular.module('_mainApp').controller('videoController', ['$scope', 'videoService', 'ngProgressFactory', function ($scope, videoService, ngProgressFactory) {

        $scope.progressbar = ngProgressFactory.createInstance();


        $scope.ClearValues = function () {
            $scope.CategoryModel = {};
        }

        $scope.SaveCategory = function () {
            try {
                $scope.progressbar.start();
                videoService.SaveCategory($scope.CategoryModel).success(function (response) {
                    $scope.progressbar.complete();
                    $scope.CategoryModel = {};
                    //messageService.ShowSuccessMessage("Succcess !", "Category saved successfully...!");
                    $scope.GetAllCategories();
                })
                    .error(function (response) {
                        //messageService.ShowFailedMessage(response.Message, JSON.stringify(response.ModelState));
                    });
            } catch (e) {
                Console.log('SaveCategory ' + e.message);
            }
        }

        $scope.GetAllCategories = function () {
            try {
                $scope.progressbar.start();
                videoService.GetVideoCategory().success(function (response) {
                    $scope.progressbar.complete();
                    $scope.Categories = response;
                })
                    .error(function (response) {
                        //messageService.ShowFailedMessage(response.Message, JSON.stringify(response.ModelState));
                    });
            } catch (e) {
                Console.log('GetAllCategories ' + e.message);
            }
        }

        $scope.PerformCategoryAction = function (id) {
            alert(id);
        }

        $scope.ClearViewTypeValues = function () {
            $scope.ViewTypeModel = {};
        }

        $scope.SaveViewTypes = function () {
            try {
                $scope.progressbar.start();
                videoService.SaveViewType($scope.ViewTypeModel).success(function (response) {
                    $scope.progressbar.complete();
                    $scope.ViewTypeModel = {};
                    //messageService.ShowSuccessMessage("Succcess !", "ViewType saved successfully...!");
                    $scope.GetAllViewtypes();
                })
                    .error(function (response) {
                        //messageService.ShowFailedMessage(response.Message, JSON.stringify(response.ModelState));
                    });
            } catch (e) {
                Console.log('SaveCategory ' + e.message);
            }
        }

        $scope.GetAllViewtypes = function () {
            try {
                $scope.progressbar.start();
                videoService.GetAllViewTypes().success(function (response) {
                    $scope.progressbar.complete();
                    $scope.ViewTypes = response;
                })
                    .error(function (response) {
                        //messageService.ShowFailedMessage(response.Message, JSON.stringify(response.ModelState));
                    });
            } catch (e) {
                Console.log('GetAllVideoTypes ' + e.message);
            }
        }

        $scope.PerformTypeAction = function (id) {
            alert(id);
        }
    }]);
})();