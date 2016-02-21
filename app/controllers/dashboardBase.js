'use strict';

angular.module('myApp', ['googlechart', 'ui.router'])
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
                });
        }])
    .controller('DashboardBaseController', ['$scope', '$state',
        function ($scope, $state) {
            $state.go('departments');
        }
    ]);
