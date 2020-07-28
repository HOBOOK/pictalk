var alertPopup = document.querySelector('common-alert');

app.controller('configController',function ($scope, $timeout) {
    $scope.saveConfig = function () {
        alertPopup.classList.add('on');
        $timeout(function () {
            alertPopup.classList.remove('on');
        },3000);
    }
});