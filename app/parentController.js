'use strict';
angular.module('myApp')
    .controller('ParentController', ['$scope', '$window', 'UsersService',
        function ($scope, $window, UsersService) {
            $scope.redirectToDashboard = function (roleId) {

                UsersService.setCurrentUser(roleId);

                if($window.location.href.indexOf("index.html") > 0) {
                    $window.location.href = $window.location.href.replace('index.html', 'views/dashboardBase.html');
                } else {
                    $window.location.href += 'views/dashboardBase.html';
                }
            };
        }
    ]);