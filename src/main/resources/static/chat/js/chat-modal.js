app.controller('chatModalController', function ($scope, $uibModalInstance) {

    // 모달 생성 이벤트
    $scope.ok = function() {
        $uibModalInstance.close($scope.newChatRoom);
    }

    // 모달 취소 이벤트
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    }

    // 채팅방 최대인원 선택옵션
    $scope.maxChatRoomMemberCountOption = [
        {value: 10, name:'10명'},
        {value: 50, name:'50명'},
        {value: 100, name:'100명'},
        {value: 250, name:'250명'},
        {value: 500, name:'500명'}
    ]

    // 채팅방 선택된 최대인원
    $scope.selectedMaxChatRoomMemberCountOption = $scope.maxChatRoomMemberCountOption[0];

    // 새로운 채팅방 모델
    $scope.newChatRoom={
        id: null,
        type: 0,
        title: "",
        description: "",
        category:[],
        img: "/img/no-image.png",
        max: $scope.selectedMaxChatRoomMemberCountOption.value,
        createDate: "2020.07.13",
        private: false,
        manager_id: 0,
        latestMessage: "",
        participants: []
    }

    // 제목 인풋 초기화
    $scope.clearTitle = function(){
        $scope.newChatRoom.title = "";
    }

    // 설명 인풋 초기화
    $scope.clearDescription = function(){
        $scope.newChatRoom.description = "";
    }

    // 태그 제거
    $scope.clearTag = function(tag){
        var index = $scope.newChatRoom.category.indexOf(tag);
        $scope.newChatRoom.category.splice(index, 1);
    }
    
    // 태그 추가 이벤트 (Enter)
    $scope.inputTempTag = "";
    $scope.onKeyPressAddTag = function ($event) {
        if($event.which === 13){
            if($scope.newChatRoom.category.length<5 && $scope.inputTempTag.length>0)
                $scope.newChatRoom.category.push($scope.inputTempTag);
            $scope.inputTempTag = "";
        }
    }
    
    // 첨부한 이미지 주소 가져와서 렌더링
    $scope.readImageURL = function(element){
        var reader = new FileReader();
        reader.onload = function(e)
        {
            $scope.$apply(function()
            {
                $scope.newChatRoom.img = e.target.result;
                $('#imagePreview').css('background-image', 'url('+e.target.result +')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            });
        };
        reader.readAsDataURL(element.file);
    }
})