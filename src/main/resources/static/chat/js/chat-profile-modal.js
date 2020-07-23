app.controller('chatProfileModalController', function ($scope, $uibModalInstance, nickname) {
    $scope.nickname= nickname;
    // 모달 생성 이벤트
    $scope.ok = function() {
        if($scope.validationSetProfile()){
            $uibModalInstance.close($scope.nickname);
        }
    }

    // 모달 취소 이벤트
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    }

    // 닉네임 초기화
    $scope.clearNickname = function(){
        $scope.nickname = "";
    }

    // 프로필 검증
    $scope.validationSetProfile = function(){
        if($scope.nickname.length <= 1){
            alert('닉네임은 2글자 이상으로 정해주세요.');
            return false;
        }else{
            return  true;
        }
    }
})
