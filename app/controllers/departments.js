'use strict';
angular.module('myApp')
    .controller('DepartmentsController', ['$scope', '$window', "$http",
        function ($scope, $window, $http) {
            $scope.title = "Departments";

            $scope.listItems = [{title: '2'}];

            $http({
                method: 'GET',
                url: 'http://169.45.106.72:8080/server/webapi/clients/' + '56c9ad7bc4fa907ce389a46d' + '/departments'
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
                        },
                        {
                            "id": "desktop-id",
                            "label": "Desktop",
                            "type": "number",
                            "p": {}
                        },
                        {
                            "id": "server-id",
                            "label": "Server",
                            "type": "number",
                            "p": {}
                        },
                        {
                            "id": "cost-id",
                            "label": "Shipping",
                            "type": "number"
                        }
                    ],
                    "rows": []
                };
                angular.forEach(departments, function (key) {
                    data.rows.push({"c": [{"v": key.title, "myVal": key._id}, {"v": 1}]});
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
                        "slices": {
                            0: {"color": "yellow"},
                            1: {"color": "yellow"},
                            2: {"color": "yellow"},
                        }
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
