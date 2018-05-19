'use strict';

(function () {
    mainapp.controller('videoController', ['$scope', 'videoService', 'ngProgressFactory', 'messageService', function ($scope, videoService, ngProgressFactory, messageService) {

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
                    messageService.ShowSuccessMessage("Succcess !", "Category saved successfully...!");
                    $scope.GetAllCategories();
                })
                    .error(function (response) {
                        messageService.ShowFailedMessage(response.Message, JSON.stringify(response.ModelState));
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
                        messageService.ShowFailedMessage(response.Message, JSON.stringify(response.ModelState));
                    });
            } catch (e) {
                Console.log('GetAllCategories ' + e.message);
            }
        }

        $scope.PerformCategoryAction = function (id) {
            alert(id);
        }
    }]);
})();