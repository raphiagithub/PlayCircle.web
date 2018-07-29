
angular.module('_mainApp').controller('userCtrl', ['$scope', 'ngProgressFactory', 'accountService', function ($scope, ngProgressFactory, accountService) {
    $scope.progressbar = ngProgressFactory.createInstance();


    $scope.LoadUsers = function () {
        try {
            $scope.progressbar.start();
            accountService.GetAllUsers().success(function (response) {
                $scope.progressbar.complete();
                $scope.Users = JSON.parse(response);
            })
                .error(function (response) {
                  //  alert(JSON.stringify(response));
                });

        } catch (e) {
           // alert(e.message);
        }
    };


    angular.element(document).ready(function () {
        //$('#userstable').DataTable();

        //$('#userstable').DataTable({
        //    'paging': true,
        //    'lengthChange': true,
        //    'searching': true,
        //    'ordering': false,
        //    'info': true,
        //    'autoWidth': true
        //})
    });

    $scope.test = function (s) {
        alert(s);
    //    alert('last record fount'+s);
        //$('#userstable').DataTable({
        //    'paging': true,
        //    'lengthChange': true,
        //    'searching': true,
        //    'ordering': true,
        //    'info': true,
        //    'autoWidth': true
        //})
    }
}]);
