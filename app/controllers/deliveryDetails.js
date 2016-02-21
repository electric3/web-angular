'use strict';

angular.module('myApp')
    .controller('DeliveryDetailsController', ['$scope', '$state',
        function ($scope, $state) {
            $scope.title = "Delivery details";

            $scope.listItems = [{title: '4'}];
        }
    ]);
