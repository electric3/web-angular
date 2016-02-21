'use strict';
angular.module('myApp')
    .controller('DepartmentsController', ['$scope', '$window', "$http", 'UsersService',
        function ($scope, $window, $http, UsersService) {
            $scope.title = "Departments";

            $scope.listItems = [{title: '2'}];

            var currentUser = UsersService.getCurrentUser();

            $http({
                method: 'GET',
                url: 'http://169.45.106.72:8080/server/webapi/clients/' + currentUser.user_metadata.clientId + '/departments'
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

            $scope.selectHandler = function (selectedItem) {
                //console.log(selectedItem.C.Gf[0].c[0].myVal);
                console.log(selectedItem);
            }
        }
    ]);
