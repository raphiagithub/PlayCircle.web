'use strict';

(function () {
    mainapp.controller('eventController', ['$scope', 'eventService', 'ngProgressFactory', 'messageService', function ($scope, eventService, ngProgressFactory, messageService) {

        $scope.progressbar = ngProgressFactory.createInstance();

        $scope.ClearEventModel = function () {
            $scope.EventModel = {};
        };

        $scope.InitiatePage = function () {
            try {
                $scope.progressbar.start();
                eventService.BindEvents().success(function (response) {
                    $scope.EventCategories = response.Category;
                    $scope.progressbar.complete();
                })
                    .error(function (response) {
                        messageService.ShowFailedMessage(response.Message, JSON.stringify(response.ModelState));
                        $scope.progressbar.complete();
                    });
            } catch (e) {
                console.log(e.message);
            }
        }

        $scope.SaveEvent = function () {
            AssignPickerValues();
            try {
                $scope.progressbar.start();
                eventService.CreateNewEvent($scope.EventModel).success(function (response) {
                    messageService.ShowSuccessMessage("Success", "Event successfully created");
                    $scope.GetAllEvents();
                    $scope.progressbar.complete();
                })
                    .error(function (response) {
                        messageService.ShowFailedMessage(response.Message, JSON.stringify(response.ModelState));
                        $scope.progressbar.complete();
                    });
            } catch (e) {
                console.log(e.message);
                $scope.progressbar.complete();
            }
        }

        $scope.GetAllEvents = function () {
            try {
                $scope.progressbar.start();
                eventService.GetAllEvents().success(function (response) {
                    $scope.progressbar.complete();
                    $scope.CompletedEvents = response.CompletedEvents;
                    $scope.UpCommingEvents = response.UpCommingEvents;
                })
                    .error(function (response) {
                        messageService.ShowFailedMessage(response.Message, JSON.stringify(response.ModelState));
                        $scope.progressbar.complete();
                    });
            } catch (e) {
                console.log("error in GetAllEvnets" + e.message);
            }
        }

        $scope.imgClicked = function (ev) {
            $scope.eventdetails = ev;
            $('#modal-event').modal('toggle');
        }

        $scope.InitiateStyles = function () {
            $scope.ClearEventModel();
            $('.select2').select2()
            $('#reservation').daterangepicker()
            $('#reservationtime').daterangepicker({ timePicker: true, timePickerIncrement: 30, format: 'MM/DD/YYYY h:mm A' })
            $('#eventstartdate').datepicker({
                autoclose: true
            })
            $('#eventenddate').datepicker({
                autoclose: true
            })
            $('#resultdate').datepicker({
                autoclose: true
            })
        }

        var AssignPickerValues = function () {
            try {
                $scope.EventModel.date_from = document.getElementById("eventstartdate").value;
                $scope.EventModel.date_to = document.getElementById("eventenddate").value;
                $scope.EventModel.winner_announcement_date = document.getElementById("resultdate").value;
                $scope.EventModel.categories = document.getElementById("category").value;
                $scope.EventModel.winners_count = document.getElementById("winnerscount").value;
            } catch (e) {
                alert(e.message);
            }

        }
    }
    ]);
})();