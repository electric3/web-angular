'use strict';

angular.module('myApp')
    .controller('ProjectsController', ['$scope', '$state', "$http",
        function ($scope, $state, $http) {

            $scope.title = "Projects";
            $scope.listItems = [{title: '1'}];

            $http({
                method: 'GET',
                url: 'http://169.45.106.72:8080/server/webapi/departments/' + '56c9ad88c4fa907ce389a46e' + '/projects'
            }).then(function successCallback(response) {

                console.log("before", $scope.chartObject);

                var departments = angular.fromJson(response.data).items;
                var data = {
                    "cols": [
                        {
                            "id": "id-project",
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
                    ],
                    "rows": []
                };
                var slices = { };
                var i = 0;
                angular.forEach(departments, function (key) {
                    data.rows.push({"c": [{"v": key.title, "project_id": key._id}, {"v": 1, "project_id": key._id}]});
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
        }
    ]);
