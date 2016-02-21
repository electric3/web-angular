'use strict';

angular.module('myApp')
    .controller('DeliveriesController', ['$scope', '$http', '$state', '$stateParams',
        function ($scope, $http, $state, $stateParams) {
            $scope.title = "Deliveries";

            $scope.listItems = [{title: '3'}];

            $http({
                method: 'GET',
                url: 'http://169.45.106.72:8080/server/webapi/projects/' + $stateParams.projectId + '/deliveries'
            }).then(function successCallback(response) {

                console.log("before", $scope.chartObject);

                var departments = angular.fromJson(response.data).items;
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
                angular.forEach(departments, function (key) {
                    data.rows.push({"c": [{"v": key.title, "delivery_id": key}, {"v": 1, "delivery_id": key}]});
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
                url: "http://169.45.106.72:8080/server/webapi/actions/project/" + $stateParams.projectId
            }).then(function successCallback(response) {
                var feed = angular.fromJson(response.data).items;
                console.log("xyi feed ", feed);
                // to do fill
            }, function errorCallback(response) {
                console.log("xyi error " + response);
            });

            $scope.selectHandler = function (selectedItem) {
                var selectedRow = selectedItem.row;
                var delivery_id = $scope.chartObject.data.rows[selectedRow].c[0].delivery_id;
                console.log("selected delivery_id", delivery_id);
                $state.go('deliveryDetails', { 'deliveryId': delivery_id });
            }

            $scope.listBtnClicked = function () {
                //$state.go('deliveryDetails');
            };
        }
    ]);
