mainapp.controller('authenticationController', ['$scope', 'accountService', function ($scope, accountService) {

    $scope.Gabriel = "success";

    $scope.PageTitle = "Registration";

    

    $scope.ClearModal = function () {
        $scope.RegistrationModal = {};

    }

    $scope.login = function () {
        $scope.response = "enter";

        try {

        
        accountService.registerUser($scope.RegistrationModel, $scope.RegistrationModel).success(function (response) {
            $scope.response = "success";
            alert(response);
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
                alert(JSON.stringify(response));
                //var errors = [];
                ////errors.push(response.Message);
                //for (var key in response.ModelState) {
                //    for (var i = 0; i < response.ModelState[key].length; i++) {
                //        errors.push(response.ModelState[key][i] + '</br>');
                //    }
                //}
                //toastr.error(errors);
                ////console.log(response)

                //$scope.registerLoading = false;
            });
            $scope.response = "nothing";
        } catch (e) {
            alert(e.message);
        }
    }
}]);