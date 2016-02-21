'use strict';
angular.module('myApp')
    .controller('ParentController', ['$scope', '$window',
        function ($scope, $window) {
            $scope.redirectToDashboard = function () {
                $window.location.href = $window.location.href.replace('index.html', 'views/dashboard.html');
            };
        }
    ]);