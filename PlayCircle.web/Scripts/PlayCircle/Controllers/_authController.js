authenticationapp.controller('authCtrl', ['$scope', 'ngProgressFactory', 'accountService', function ($scope, ngProgressFactory, accountService) {
    $scope.progressbar = ngProgressFactory.createInstance();
    $scope.Page = {
        _pagetitle: 'Login',
        _pageurl: '/Content/Partials/Authentication/_login.html'
    };

    $scope.initcheckbox = function () {
        $('input').iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%' /* optional */
        });
    };

    $scope.progressbar.start();
    $scope.progressbar.complete();


    $scope.SetPage = function (urltype) {
        $scope.progressbar.start();
        $scope.clearmodel();
        switch (urltype) {
            case 'forgotpwd':
                {
                    $scope.Page = {
                        _pagetitle: 'Reset Password',
                        _pageurl: '/Content/Partials/Authentication/_forgotpassword.html'
                    };
                    $scope.progressbar.complete();
                }
                break;

            case 'register':
                {
                    $scope.Page = {
                        _pagetitle: 'Register',
                        _pageurl: '/Content/Partials/Authentication/_register.html'
                    };
                    $scope.progressbar.complete();
                }
                break;

            case 'login':
                {
                    $scope.Page = {
                        _pagetitle: 'Login',
                        _pageurl: '/Content/Partials/Authentication/_login.html'
                    };
                    $scope.progressbar.complete();
                }
                break;
            default:
                {
                    $scope.Page = {
                        _pagetitle: 'Login',
                        _pageurl: '/Content/Partials/Authentication/_login.html'
                    };
                    $scope.progressbar.complete();
                }
        }
    }


    $scope.clearmodel = function () {
        $scope.LoginModal = {};
        $scope.RegistrationModel = {};
    };


    $scope.SignUp = function () {
        try {
            $scope.progressbar.start();
            if ($scope.RegistrationModel.Password === $scope.RegistrationModel.RePassword) {
                if ($scope.RegistrationModel.FullName != '' &&
                    $scope.RegistrationModel.Email &&
                    $scope.RegistrationModel.MobileNo &&
                    $scope.RegistrationModel.UserName &&
                    $scope.RegistrationModel.Password &&
                    $scope.RegistrationModel.RePassword) {
                    accountService.registerUser($scope.RegistrationModel, $scope.RegistrationModel).success(function (response) {
                        swal("Success !", 'User account created !', "success");
                        $scope.progressbar.complete();
                    })
                        .error(function (response) {
                            swal("Failed !", JSON.stringify(response.ModelState), "warning");
                            $scope.progressbar.complete();
                        });
                }
                else {
                    swal("Warning !", "All fields are mandatory, please fill out !", "warning");
                    $scope.progressbar.complete();
                }
            }
            else {
                swal("Warning !", "Password and Re-password must be same !", "warning");
            }

        } catch (e) {
            alert(e.message);
            $scope.progressbar.complete();
        }
    }


    $scope.login = function (e) {
        if ($scope.LoginModal.UserName !== undefined && $scope.LoginModal.Password !== undefined) {
            try {
                $scope.progressbar.start();
                accountService.loginUser($scope.LoginModal).success(function (response) {
                    $scope.progressbar.complete();
                    window.location.href = "/Index.html";
                })
                    .error(function (response) {
                        $scope.progressbar.complete();
                        swal("Warning !", response.error_description, "warning");
                    });

            } catch (e) {
                alert(e.message);
            }
        }
        else {
            swal("Warning !", "Please fillout all fields !", "warning");
            e.preventdefault;
        }
    };

}]);