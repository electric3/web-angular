'use strict';

angular.module('myApp')
    .controller('DeliveryDetailsController', ['$scope', '$state',
        function ($scope, $state) {
            $scope.title = "Delivery 1";

            $scope.listItems = [{title: '4'}];
        }
    ]);
