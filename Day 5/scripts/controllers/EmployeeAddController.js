hrApp.controller('EmployeeAddController', ['$scope', '$http', '$location', 'CommonResourcesFactory','ManagerService',
    function($scope, $http, $location, CommonResourcesFactory,ManagerService) {
        $scope.employee = {};
        $scope.departaments ={};
        $scope.jobs ={};
        $scope.managers =[];

        $scope.requiredErrorMessage = "Please fill out this form!";
        $scope.patternDateNotRespectedMessage = "The date format should be yyyy-mm-dd";
        $scope.patternCommisionNotRespectedMessage = "Commission should be in the format 0.XX";

        //TODO #HR1



        $http.get(CommonResourcesFactory.findAllDepartmentsUrl)
            .success(function (data, status, headers, config) {
                $scope.departaments = data;
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





        $scope.employee.managerId
        /**
         * Reset form
         */
        $scope.reset = function () {
            this.employee = {};
        };

        /**
         * Persist an employee
         * @param addEmployee - employee to be persisted
         */
        $scope.create = function (addEmployee) {
            $http({url: CommonResourcesFactory.addEmployeeUrl, method: 'POST', data: addEmployee})
                .success(function (data) {
                    $scope.employee = data;
                    $location.url('/employeeView/' + $scope.employee.employeeId);
                });
        };

        $scope.datePattern = /^\d{4}-\d{2}-\d{2}$/;
        $scope.commissionPattern = /^[0]\.\d{1}(\d)?$/;
    }]);