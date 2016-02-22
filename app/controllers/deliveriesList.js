'use strict';

angular.module('myApp')
    .controller('DeliveriesListController', ['$scope', '$http', '$stateParams', '$state', 'UsersService',
        function ($scope, $http, $stateParams, $state, UsersService) {

            $scope.deliveries = [];

            $http({
                method: "GET",
                url: "http://169.45.106.72:8080/server/webapi/deliveries/user/" + UsersService.getCurrentUser().user_id
            }).then(function successCallback(response) {
                $scope.deliveries = angular.fromJson(response.data).items;
                console.log($scope.deliveries.length);
            }, function errorCallback(response) {
                console.log(response);
            });

            $scope.showDeliveryDetails = function (delivery) {
                $state.go('deliveryDetails', { 'origin': 'deliveriesList', 'delivery': delivery });
            };
        }
    ]);
