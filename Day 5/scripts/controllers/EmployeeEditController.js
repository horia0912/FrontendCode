hrApp.controller('EmployeeEditController', ['$scope', '$http', '$routeParams', '$location', 'CommonResourcesFactory','ManagerService','EmployeeService',
    function ($scope, $http, $routeParams, $location, CommonResourcesFactory,ManagerService,EmployeeService) {
        $scope.requiredErrorMessage = "Please fill out this form!";
        $scope.patternDateNotRespectedMessage = "The date format should be yyyy-mm-dd";
        $scope.patternCommisionNotRespectedMessage = "Commission should be in the format 0.XX";
        $scope.jobs = [];
        $scope.departments = [];
        $scope.managers = [];
        $scope.employee = [];
        //TODO #HR5
        $http.get(CommonResourcesFactory.findAllDepartmentsUrl)
            .success(function (data, status, headers, config) {
                $scope.departments = data;
            });
        $http.get(CommonResourcesFactory.findAllJobsUrl)
            .success(function (data, status, headers, config) {
                $scope.jobs = data;
            });
        ManagerService.findManagers()
            .then(function (res) {
                $scope.managers = res.data;

            }, function (err) {
                console.log("Error at employees/findOne: " + err);
            });
        EmployeeService.findById($routeParams.employeeId)
            .then(function (res) {
                $scope.employee = res.data;
            }, function (err) {
                console.log("Error at employees/findOne: " + err);
            });
        /**
         * Reset form
         */
        $scope.reset = function () {
            $scope.employee = {};
        };

        /**
         * Persist an employee
         * @param addEmployee - employee to be persisted
         */
        $scope.create = function (addEmployee) {
            $http({url: CommonResourcesFactory.editEmployeeUrl, method: 'PUT', data: addEmployee})
                .success(function (data) {
                    $scope.employee = data;
                    $location.url('/employeeView/' + $scope.employee.employeeId);
                });
        };

        $scope.datePattern = /^\d{4}-\d{2}-\d{2}$/;
        $scope.commissionPattern =  /^[0]\.\d{1}(\d)?$/;

    }]);