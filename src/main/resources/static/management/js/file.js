app.controller("fileCtrl", function ($scope) {
    //초기값
    $scope.images_state = "groups";
    $scope.trash_state = "groups";

    //전체 이미지 채팅방 정보
    $scope.rooms = [{
        no: 0,
        type: 0,
        title: "방제목1AAAAaaaaaaaaaaaaaaaaaa",
        imagePath : "/chat/img/image_example.jpg"
    },{
        no: 0,
        type: 0,
        title: "방제목2방제목2방제목2방제목2방제목2방제목2",
        imagePath : "/chat/img/image_example.jpg"
    },{
        no: 0,
        type: 0,
        title: "방제목3",
        imagePath : "/chat/img/image_example.jpg"
    },{
        no: 0,
        type: 0,
        title: "방제목4",
        imagePath : "/chat/img/image_example.jpg"
    },{
        no: 0,
        type: 0,
        title: "방제목5",
        imagePath : "/chat/img/image_example.jpg"
    },{
        no: 0,
        type: 0,
        title: "방제목6",
        imagePath : "/chat/img/image_example.jpg"
    },{
        no: 0,
        type: 0,
        title: "방제목7",
        imagePath : "/chat/img/image_example.jpg"
    },{
        no: 0,
        type: 0,
        title: "방제목8",
        imagePath : "/chat/img/image_example.jpg"
    },{
        no: 0,
        type: 0,
        title: "방제목9",
        imagePath : "/chat/img/image_example.jpg"
    },{
        no: 0,
        type: 0,
        title: "방제목10",
        imagePath : "/chat/img/image_example.jpg"
    }];


    $scope.room_delete = function (room) {
        var idx = $scope.rooms.findIndex(function (item) {
            return item.no == room.no;
        })

        if(idx>-1){
            $scope.rooms.splice(idx,1)
        }
    };


    $scope.rooms_trash = [{
        no: 0,
        type: 0,
        title: "삭제 채팅방1"
    },{
        no: 0,
        type: 0,
        title: "삭제 채팅방12"
    },{
        no: 0,
        type: 0,
        title: "삭제 채팅방13"
    },{
        no: 0,
        type: 0,
        title: "삭제 채팅방14"
    },{
        no: 0,
        type: 0,
        title: "삭제 채팅방15"
    },{
        no: 0,
        type: 0,
        title: "삭제 채팅방16"
    },{
        no: 0,
        type: 0,
        title: "삭제 채팅방17"
    },{
        no: 0,
        type: 0,
        title: "삭제 채팅방18"
    },{
        no: 0,
        type: 0,
        title: "삭제 채팅방19"
    },{
        no: 0,
        type: 0,
        title: "삭제 채팅방10"
    }];

    $scope.images_button = function(){
        $scope.images_state = "groups";
    }

    $scope.chat_group_content = function(room) {
        console.log(room.no);
    //    채팅방 이미지 불러오기

        $scope.images_state = room.title;

        // 채팅방 내 모든 사진
        $scope.images = [{
            no: 0,
            user: "지은",
            title: "사진이름1",
            imagePath : "/profile/danbi2.jpg"
        }];
    }

    //이미지 삭제
    $scope.image_delete = function (image) {
        var idx = $scope.images.findIndex(function (item) {
            return item.no == image.no;
        })

        if(idx>-1){
            $scope.images.splice(idx,1)
        }
    };

    
    //선택된 채팅 그룹 삭제
    $scope.all_room_delete = function () {

        //checked index 확인

    };

});