'use strict';

angular.module('myApp')
    .controller('ProjectsController', ['$scope', '$state',
        function ($scope, $state) {

            $scope.title = "Projects";
            $scope.listItems = [{title: '1'}];

        }
    ]);
