app.controller('chatModalController', function ($scope, $http, $uibModalInstance) {

    // 모달 생성 이벤트
    $scope.ok = function() {
        if($scope.validationAddChatRoom()){
            $scope.saveConfig();
            $scope.createChatRoom();
        }
    }

    $scope.createChatRoom = function(){
        $http({
            method: 'POST',
            url: 'test',
            data: $scope.newChatRoom
        }).then(function successCallback(response){
            console.log('새로운 채팅방 생성 성공 -> ' +response);
            $uibModalInstance.close(response.data);
        }, function errorCallback(response){
            console.log('채팅방 정보를 생성 오류발생 -> ' +response);
            $uibModalInstance.cancel();
        });
    }

    // 모달 취소 이벤트
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    }
    $scope.config = {
        isPrivate: false,
        isImageChat: false
    }

    $scope.saveConfig = function(){
        var config = $scope.config;
        $scope.newChatRoom.isPrivate = config.isPrivate;
        $scope.newChatRoom.type = config.isImageChat ? 1 : 0;

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
        type: 0,
        title: "",
        description: "",
        categories:[],
        img: "/img/no-image.png",
        max: $scope.selectedMaxChatRoomMemberCountOption.value,
        isPrivate: false,
        managerId: 0,
        participants: [],
        likes: [],
        messages: [],
        accessKey: "",
        savedImages:[],
        notification: "",
        chatRoomConfig:{
            isHideNotification: false,
            isEditNotification: false,
            isMoreNotification: false
        }
    }

    // 제목 인풋 초기화
    $scope.clearTitle = function(){
        $scope.newChatRoom.title = "";
    }

    // 설명 인풋 초기화
    $scope.clearDescription = function(){
        $scope.newChatRoom.description = "";
    }
    $scope.clearAccessKey = function(){
        $scope.newChatRoom.accessKey = "";
    }

    // 태그 제거
    $scope.clearTag = function(tag){
        var index = $scope.newChatRoom.categories.indexOf(tag);
        $scope.newChatRoom.categories.splice(index, 1);
    }
    
    // 태그 추가 이벤트 (Enter)
    $scope.inputTempTag = "";
    $scope.onKeyPressAddTag = function ($event) {
        if($event.which === 13){
            if($scope.newChatRoom.categories.length<5 && $scope.inputTempTag.length>0)
                $scope.newChatRoom.categories.push($scope.inputTempTag);
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

    // 새로운 대화방 데이터 검증(추가중..)
    $scope.validationAddChatRoom = function(){
        if($scope.newChatRoom.title.length === 0){
            alert('대화방 제목을 입력해주세요');
            return false;
        }else if($scope.newChatRoom.description.length === 0){
            alert('대화방 설명을 입력해주세요');
            return false;
        }else if($scope.newChatRoom.private && $scope.newChatRoom.accessKey.length <=3){
            alert('접근코드는 4자리 이상이여야 합니다.');
            return false;
        }else{
            return  true;
        }
    }
})
