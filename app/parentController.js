'use strict';
angular.module('myApp')
    .controller('ParentController', ['$scope', '$window',
        function ($scope, $window) {
            $scope.redirectToDashboard = function () {
                if($window.location.href.indexOf("index.html") > 0) {
                    $window.location.href = $window.location.href.replace('index.html', 'views/dashboardBase.html');
                } else {
                    $window.location.href += 'views/dashboardBase.html';
                }
            };
        }
    ]);