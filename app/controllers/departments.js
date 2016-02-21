'use strict';
angular.module('myApp')
    .controller('DepartmentsController', ['$scope', '$window', "$http", '$stateParams', '$state',
        function ($scope, $window, $http, $stateParams, $state) {
            $scope.title = "Departments";

            $scope.listItems = [{title: '2'}];

            $scope.actions = [];

            $http({
                method: 'GET',
                url: 'http://169.45.106.72:8080/server/webapi/clients/' + $stateParams.clientId + '/departments'
            }).then(function successCallback(response) {

                var departments = angular.fromJson(response.data).items;
                var data = {
                    "cols": [
                        {
                            "id": "id-department",
                            "label": "Department",
                            "type": "string",
                            "p": {}
                        },
                        {
                            "id": "id-number",
                            "label": "Department",
                            "type": "number",
                            "p": {}
                        }
                    ],
                    "rows": []
                };
                var slices = { };
                var i = 0;
                angular.forEach(departments, function (key) {

                    data.rows.push({"c": [{"v": key.title, "department_id": key._id}, {"v": 1, "department_id": key._id}]});
                    if( "0" == key.status ) {
                        slices[i++] = { "color": "red" };
                    } else if( "1" == key.status ) {
                        slices[i++] = { "color": "orange" };
                    } else if( "2" == key.status ) {
                        slices[i++] = { "color": "green" };
                    }
                });

                console.log("after", data);

                $scope.chartObject = {
                    "type": "PieChart",
                    "displayed": true,
                    "data": data,
                    "options": {
                        "isStacked": "true",
                        "fill": 30,
                        pieSliceText: "label",
                        "tooltip": {
                            "isHtml": false,
                            "trigger": "none"
                        },
                        "slices": slices,
                    },
                    "formatters": {}
                };

            }, function errorCallback(response) {
                console.log("xyi error " + response);
            });

            $http({
                method: "GET",
                url: "http://169.45.106.72:8080/server/webapi/actions/client/" + $stateParams.clientId
            }).then(function successCallback(response) {
                $scope.actions = angular.fromJson(response.data).items;
                // to do fill
            }, function errorCallback(response) {
                console.log("xyi error " + response);
            });

            $scope.selectHandler = function (selectedItem) {
                var selectedRow = selectedItem.row;
                var departmentId = $scope.chartObject.data.rows[selectedRow].c[0].department_id;
                console.log("selected", departmentId);
                $state.go('projects', { 'departmentId': departmentId });
            }
        }
    ]);
