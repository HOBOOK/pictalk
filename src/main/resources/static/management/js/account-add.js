app.controller('addAccountCtrl', function ($scope, $http, $uibModalInstance) {

    $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
    }


    $scope.checkFirst = false;
    $scope.checkedEmail = false;
    $scope.checkEmailalert = false;
    $scope.createdUser={};

    $scope.creatUser = function(user){
        $scope.createdUser = angular.copy(user);

        $uibModalInstance.dismiss('cancel');
    }


    $scope.checkEmail = function (email) {

        $scope.checkFirst = true;
        $scope.checkedEmail = true;
        $scope.checkEmailalert = false;

    }

});