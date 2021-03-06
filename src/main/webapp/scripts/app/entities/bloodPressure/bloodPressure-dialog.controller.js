'use strict';

angular.module('21pointsApp').controller('BloodPressureDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'BloodPressure', 'User',
        function ($scope, $stateParams, $modalInstance, entity, BloodPressure, User) {

            // defaults for new entries
            if (!entity.id) {
                var now = new Date();
                entity.timestamp = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes()));
            }

            $scope.bloodPressure = entity;
            $scope.users = User.query();
            $scope.load = function (id) {
                BloodPressure.get({id: id}, function (result) {
                    $scope.bloodPressure = result;
                });
            };

            var onSaveFinished = function (result) {
                $scope.$emit('21pointsApp:bloodPressureUpdate', result);
                $modalInstance.close(result);
            };

            $scope.save = function () {
                if ($scope.bloodPressure.id != null) {
                    BloodPressure.update($scope.bloodPressure, onSaveFinished);
                } else {
                    BloodPressure.save($scope.bloodPressure, onSaveFinished);
                }
            };

            $scope.clear = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
