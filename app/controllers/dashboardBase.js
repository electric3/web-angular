'use strict';

angular.module('myApp', ['googlechart', 'ui.router', 'ngMaterial', 'angular-storage'])
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise("#/");

            $stateProvider
                .state('departments', {
                    url: "/departments",
                    controller: 'DepartmentsController',
                    templateUrl: function () {
                        return 'dashboard.html';
                    }
                })
                .state('deliveries', {
                    url: "/deliveries",
                    controller: 'DeliveriesController',
                    templateUrl: function () {
                        return 'dashboard.html';
                    }
                })
                .state('deliveryDetails', {
                    url: "/deliveryDetails",
                    controller: 'DeliveryDetailsController',
                    templateUrl: function () {
                        return 'deliveryDetails.html';
                    }
                })
                .state('projects', {
                    url: "/projects",
                    controller: 'ProjectsController',
                    templateUrl: function () {
                        return 'dashboard.html';
                    }
                });
        }])
    .controller('DashboardBaseController', ['$scope', '$state', 'store', '$window',
        function ($scope, $state, store, $window) {

            $scope.logout = function () {
                store.remove('currentUser');
                $window.location.href = $window.location.origin;
            };

            $state.go('departments');
        }
    ]);
