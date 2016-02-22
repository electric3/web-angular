'use strict';

angular.module('myApp')
    .controller('DeliveryDetailsController', ['$scope', '$http', '$stateParams', '$state', 'UsersService',
        function ($scope, $http, $stateParams, $state, UsersService) {

            if (!$stateParams.delivery) {
                $state.go('deliveries');
            }

            $scope.delivery = $stateParams.delivery;

            $scope.title = $scope.delivery.title;

            $scope.comments = [];

            $scope.comment = {
                "comment": '',
                "author": UsersService.getCurrentUser()
            };

            var loadComments = function () {
                $http({
                    method: "GET",
                    url: "http://169.45.106.72:8080/server/webapi/deliveries/" + $scope.delivery._id + '/comments'
                }).then(function successCallback(response) {
                    $scope.comments = angular.fromJson(response.data).items;
                    // to do fill
                }, function errorCallback(response) {
                    console.log(response);
                });
            };

            $scope.addCommentClicked = function () {
                $http({
                    method: "POST",
                    data: $scope.comment,
                    url: "http://169.45.106.72:8080/server/webapi/deliveries/" + $scope.delivery._id + '/comment'
                }).then(function successCallback(response) {
                    $scope.comments.length = 0;
                    loadComments();
                }, function errorCallback(response) {
                    console.log(response);
                });
            };

            $scope.backBtnClicked = function () {
                $state.go($stateParams.origin, { 'departmentId': $stateParams.departmentId, 'projectId': $stateParams.projectId });
            };

            $scope.deliveryStatusChanged = function (newStatus) {
                $http({
                    method: "GET",
                    url: "http://169.45.106.72:8080/server/webapi/deliveries/" + $scope.delivery._id + '/setStatus/' + newStatus
                }).then(function successCallback(response) {
                    $scope.comments.length = 0;
                    loadComments();
                }, function errorCallback(response) {
                    console.log(response);
                });
            }

            $scope.sliderValueChanged = function (newProgress) {
                console.log(newProgress);
            }

            loadComments();
        }
    ]);
