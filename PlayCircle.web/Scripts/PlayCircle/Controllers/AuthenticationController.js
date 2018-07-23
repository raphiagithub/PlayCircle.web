mainapp.controller('authenticationController', ['$scope', 'accountService', 'ngProgressFactory', 'messageService', function ($scope, accountService, ngProgressFactory, messageService) {

  
    $scope.progressbar = ngProgressFactory.createInstance();


    $scope.ClearModal = function () {
        $scope.RegistrationModal = {};
        $scope.LoginModal = {};
    }

    $scope.CheckAdmin = function () {
        accountService.CheckAdminExistancy().success(function (response) {
            $scope.isAdminExists = response;
            $scope.isAdminExists = false;
        })
            .error(function (response) {
                alert(JSON.stringify(response));
            });
    }

    $scope.SignUp = function () {
        try {
            accountService.registerUser($scope.RegistrationModel, $scope.RegistrationModel).success(function (response) {
                alert(response);
            })
                .error(function (response) {
                    messageService.ShowFailedMessage(response.Message, JSON.stringify(response.ModelState));
                });
        } catch (e) {
            alert(e.message);
        }
    }

    $scope.login = function () {
        try {
            $scope.progressbar.start();
            accountService.loginUser($scope.LoginModal).success(function (response) {
                $scope.progressbar.complete();
                window.location.href = "/Accounts";
            })
                .error(function (response) {
                    $scope.progressbar.complete();
                    messageService.ShowFailedMessage("Sorry !", response.error_description);
                });

        } catch (e) {
            alert(e.message);
        }
    }
}]);