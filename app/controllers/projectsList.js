'use strict';

angular.module('myApp')
    .controller('DeliveriesListController', ['$scope', '$http', '$stateParams', '$state', 'UsersService',
        function ($scope, $http, $stateParams, $state, UsersService) {

            $scope.projects = [];

            $http({
                method: "GET",
                url: "http://169.45.106.72:8080/server/webapi/projects/user/" + UsersService.getCurrentUser().user_id
            }).then(function successCallback(response) {
                $scope.projects = angular.fromJson(response.data).items;
            }, function errorCallback(response) {
                console.log(response);
            });

            $scope.showProjectDetails = function (project) {
                $state.go('deliveries', { 'origin': 'projectsList', 'projectId': project._id });
            };
        }
    ]);
