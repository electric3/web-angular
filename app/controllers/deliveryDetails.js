'use strict';

angular.module('myApp')
    .controller('DeliveryDetailsController', ['$scope', '$state', '$stateParams',
        function ($scope, $stateParams) {

            $scope.delivery = $stateParams.delivery;

            $scope.title = $scope.delivery.title;

            $scope.listItems = [{title: '4'}];

            $scope.comments = [];

            $http({
                method: "GET",
                url: "http://169.45.106.72:8080/server/webapi/deliveries/" + $scope.delivery._id + '/comments'
            }).then(function successCallback(response) {
                $scope.comments = angular.fromJson(response.data).items;
                // to do fill
            }, function errorCallback(response) {
                console.log(response);
            });
        }
    ]);
