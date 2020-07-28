

app.controller('configController',function ($scope, $timeout, UserService) {
    var alertPopup = document.querySelector('.common-alert');
    $scope.config = UserService.config;

    /* 저장 완료 함수 */
    $scope.saveConfig = function () {
        console.log('ddd');
        alertPopup.classList.add('on');
        $timeout(function () {
            alertPopup.classList.remove('on');
        },2000);
    }

    /* 화면 배율 설정 */
    $scope.setStepBarClass = function (index) {
        if($scope.config.style.scale === index)
            return "config-step selected";
        else if($scope.config.style.scale > index)
            return "config-step completed";
        else
            return "config-step";
    }
    $scope.selectStepBar = function (index) {
        $scope.config.style.scale = index;
        var scale = "medium";
        switch ($scope.config.style.scale) {
            case 0:
                scale = "small";
                break;
            case 1:
                scale = "medium";
                break;
            case 2:
                scale = "large";
                break;
        }
        $('html').css('font-size', scale);
        $scope.saveConfig();
    }
});
