app.controller('chatModalController', function ($scope, $uibModalInstance) {
    $scope.ok = function() {
        $uibModalInstance.close(items);
    }
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    }
})