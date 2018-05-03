mainapp.controller('authenticationController', ['$scope', 'accountService', function ($scope, accountService) {



    $scope.PageTitle = "Registration";

    

    $scope.ClearModal = function () {
        $scope.RegistrationModal = {};

    }

    $scope.login = function () {
        // alert(JSON.stringify($scope.RegistrationModal));
        alert($scope.RegistrationModel.Password);

        accountService.registerUser($scope.RegistrationModel, $scope.RegistrationModel).success(function (response) {
            //toastr.success("Registered successfully. Please check your registered email, to activate your account.");
            //toastr.success(messageService.successRegister);
            //$scope.registerMessage = {
            //    message: messageService.successRegister,
            //    type: 'success'
            //}
            //$scope.registerModel = {};
            //$scope.registerForm.$setPristine();
            //$scope.registerLoading = false;
        })
            .error(function (response) {
                //var errors = [];
                ////errors.push(response.Message);
                //for (var key in response.ModelState) {
                //    for (var i = 0; i < response.ModelState[key].length; i++) {
                //        errors.push(response.ModelState[key][i] + '</br>');
                //    }
                //}
                //toastr.error(errors);
                ////console.log(response)
                alert(response);

                //$scope.registerLoading = false;
            });
    }
}]);