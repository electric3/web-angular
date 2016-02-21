'use strict';

angular.module('myApp')
    .controller('DeliveriesController', ['$scope', '$state',
        function ($scope, $state) {
            $scope.title = "Deliveries";

            $scope.listItems = [{title: '3'}];

            $scope.listBtnClicked = function () {
                $state.go('deliveryDetails');
            };
        }
    ]);
