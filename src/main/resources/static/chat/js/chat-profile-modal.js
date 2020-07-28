app.controller('chatProfileModalController', function ($scope, $uibModalInstance, user, room) {
    $scope.room = room;
    $scope.nickname= user.nickname;
    $scope.avatar = user.avatar;
    $scope.accessKey = "";
    $scope.defaultAvatars = ["/img/avatar/default/avatar_default-001.png",
        "/img/avatar/default/avatar_default-002.png",
        "/img/avatar/default/avatar_default-003.png",
        "/img/avatar/default/avatar_default-004.png",
        "/img/avatar/default/avatar_default-005.png",
        "/img/avatar/default/avatar_default-006.png",
        "/img/avatar/default/avatar_default-007.png",
        "/img/avatar/default/avatar_default-008.png",
        "/img/avatar/default/avatar_default-009.png",
        "/img/avatar/default/avatar_default-010.png",
        "/img/avatar/default/avatar_default-011.png",
        "/img/avatar/default/avatar_default-012.png",
        "/img/avatar/default/avatar_default-013.png",
        "/img/avatar/default/avatar_default-014.png",
        "/img/avatar/default/avatar_default-015.png",
        "/img/avatar/default/avatar_default-016.png",
        "/img/avatar/default/avatar_default-017.png",
        "/img/avatar/default/avatar_default-018.png",
        "/img/avatar/default/avatar_default-019.png",
        "/img/avatar/default/avatar_default-020.png",
        "/img/avatar/default/avatar_default-021.png",
        "/img/avatar/default/avatar_default-022.png",
        "/img/avatar/default/avatar_default-023.png",
        "/img/avatar/default/avatar_default-024.png"];

    // 모달 생성 이벤트
    $scope.ok = function() {
        if($scope.validationSetProfile()){
            $uibModalInstance.close({
                nickname: $scope.nickname,
                avatar: $scope.avatar
            });
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

    // 접근 코드 초기화
    $scope.clearAccessKey = function(){
        $scope.accessKey = "";
    }

    // 프로필 검증
    $scope.validationSetProfile = function(){
        if($scope.nickname.length <= 1){
            alert('닉네임은 2글자 이상으로 정해주세요.');
            return false;
        }else if($scope.room.private && $scope.accessKey !== $scope.room.accessKey){
            $scope.accessKey = '';
            alert('접근코드가 일치하지 않습니다.');
        }else{
            return  true;
        }
    }

    // 첨부한 이미지 주소 가져와서 렌더링
    $scope.readImageURL = function(element){
        var reader = new FileReader();
        reader.onload = function(e)
        {
            if(e.target.result){
                console.log(e.target.result);
                $scope.avatar = e.target.result;
                $scope.renderAvatarImage();
            }
        };
        reader.readAsDataURL(element.file);
    }

    // 첨부한 이미지 주소 가져와서 렌더링
    $scope.renderAvatarImage = function(){
        $('#imagePreview').css('background-image', 'url('+$scope.avatar +')');
    }

    $scope.onClickSelectAvatar = function(avatar){
        $scope.avatar = avatar;
        $scope.renderAvatarImage();
    }
})
