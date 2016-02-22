'use strict';

angular.module('myApp')
    .controller('DeliveriesController', ['$scope', '$http', '$state', '$stateParams',
        function ($scope, $http, $state, $stateParams) {

            if (!$stateParams.projectId) {
                $state.go('projects');
            }

            $scope.title = "Deliveries";

            $scope.listItems = [{title: '3'}];

            $scope.actions = [];

            $http({
                method: 'GET',
                url: 'http://169.45.106.72:8080/server/webapi/projects/' + $stateParams.projectId + '/deliveries'
            }).then(function successCallback(response) {

                console.log("before", $scope.chartObject);

                var deliveries = angular.fromJson(response.data).items;
                var data = {
                    "cols": [
                        {
                            "id": "id-delivery",
                            "label": "Delivery",
                            "type": "string",
                            "p": {}
                        },
                        {
                            "id": "id-number",
                            "label": "Delivery",
                            "type": "number",
                            "p": {}
                        },
                    ],
                    "rows": []
                };
                var slices = { };
                var i = 0;
                angular.forEach(deliveries, function (key) {
                    data.rows.push({"c": [{"v": key.title, "delivery": key}, {"v": 1, "delivery": key}]});
                    if( "0" === key.status ) {
                        slices[i++] = { "color": "red" };
                    } else if( "1" === key.status ) {
                        slices[i++] = { "color": "orange" };
                    } else if( "2" === key.status ) {
                        slices[i++] = { "color": "green" };
                    }
                    console.log(key.status);
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
                console.log("error " + response);
            });

            $http({
                method: "GET",
                url: "http://169.45.106.72:8080/server/webapi/actions/project/" + $stateParams.projectId
            }).then(function successCallback(response) {
                $scope.actions = angular.fromJson(response.data).items;
            }, function errorCallback(response) {
                console.log(response);
            });

            $scope.selectHandler = function (selectedItem) {
                var selectedRow = selectedItem.row;
                var delivery = $scope.chartObject.data.rows[selectedRow].c[0].delivery;
                console.log("selected delivery ", delivery);
                $state.go('deliveryDetails', { 'origin': 'deliveries', 'delivery': delivery, 'projectId': $stateParams.projectId, 'departmentId': $stateParams.departmentId });
            }

            $scope.backBtnClicked = function () {
                var state = $stateParams.origin ? $stateParams.origin : 'projects';
                $state.go(state, { 'departmentId': $stateParams.departmentId });
            };

            $scope.listBtnClicked = function () {
                //$state.go('deliveryDetails');
            };
        }
    ]);
