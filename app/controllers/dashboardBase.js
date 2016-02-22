'use strict';

angular.module('myApp', ['googlechart', 'ui.router', 'ngMaterial', 'angular-storage'])
    .config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider',
        function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {

          $mdThemingProvider.theme('default')
            .primaryPalette('cyan')
            .accentPalette('orange');

            $urlRouterProvider.otherwise("#/");

            $stateProvider
                .state('departments', {
                    url: "/departments",
                    controller: 'DepartmentsController',
                    templateUrl: function () {
                        return 'dashboard.html';
                    },
                    params: {
                        'clientId': undefined
                    }
                })
                .state('deliveries', {
                    url: "/deliveries",
                    controller: 'DeliveriesController',
                    templateUrl: function () {
                        return 'dashboard.html';
                    },
                    params: {
                        'projectId': undefined
                    }
                })
                .state('deliveryDetails', {
                    url: "/deliveryDetails",
                    controller: 'DeliveryDetailsController',
                    templateUrl: function () {
                        return 'deliveryDetails.html';
                    },
                    params: {
                        'delivery': undefined
                    }
                })
                .state('projects', {
                    url: "/projects",
                    controller: 'ProjectsController',
                    templateUrl: function () {
                        return 'dashboard.html';
                    },
                    params: {
                        'departmentId': undefined
                    }
                });
        }])
    .controller('DashboardBaseController', ['$scope', '$state', 'store', '$window', 'UsersService',
        function ($scope, $state, store, $window, UsersService) {

            $scope.logout = function () {
                store.remove('currentUser');
                $window.location.href = $window.location.origin;
            };

            var currentUser = UsersService.getCurrentUser();

            $state.go('departments', { 'clientId': currentUser.user_metadata.clientId });
        }
    ]);
