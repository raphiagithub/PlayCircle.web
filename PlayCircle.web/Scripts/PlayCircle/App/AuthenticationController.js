mainapp.controller('authenticationController', ['$scope', 'accountService', function ($scope, accountService) {

    $scope.PageTitle = "Registration";
    $scope.emailFormat = /^[a-zA-Z0-9._]+[@]+[a-zA-Z0-9]+[.]+[a-zA-Z]{2,6}/;
    $scope.emailPattern = "wrong email";


    $scope.ClearModal = function () {
        $scope.RegistrationModal = {};
        $scope.LoginModal = {};
    }

    $scope.CheckAdmin = function () {
        accountService.CheckAdminExistancy().success(function (response) {
            $scope.isAdminExists = response;
        })
            .error(function (response) {
            });
    }

    $scope.SignUp = function () {
        try {
            accountService.registerUser($scope.RegistrationModel, $scope.RegistrationModel).success(function (response) {
                alert(response);
            })
                .error(function (response) {
                    alert(JSON.stringify(response));
                });
        } catch (e) {
            alert(e.message);
        }
    }

    $scope.login = function () {
        accountService.loginUser($scope.LoginModal).success(function (response) {
            alert(JSON.stringify(response));
                //if (response.loginCount < 1)
                //    window.location.href = "/account/profile";
                //else {
                //    if (response.PaidUser == "True") {
                //        window.location.href = "/dashboard";
                //    }
                //    else {
                //        window.location.href = "/landing";
                //    }
                //}
            })
                .error(function (response) {
                    alert(JSON.stringify( response));
                    //toastr.error(response.error_description)
                    ////console.log(response)
                    //$scope.loginLoading = false;
            });

        //accountService.GetuserInfo().success(function (response) {
        //    alert("success" +JSON.stringify(response));
        //})
        //    .error(function (response) {
        //        alert("error"+JSON.stringify(response));
        //    });
        
        //window.location.href = "/Accounts";

    }

}]);