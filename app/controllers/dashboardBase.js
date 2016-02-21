'use strict';

angular.module('myApp', ['googlechart', 'ui.router'])
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise("#/");

            $stateProvider
                .state('departments', {
                    url: "/departments",
                    templateUrl: function () {
                        return 'dashboard.html';
                    }
                })
                .state('deliveries', {
                    url: "/deliveries",
                    templateUrl: function () {
                        return 'deliveries.html';
                    }
                });
        }])
    .controller('DashboardBaseController', ['$scope', '$state',
        function ($scope, $state) {
            $state.go('departments');
        }
    ]);
