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


    //페이징 변수
    $scope.images =[];
    $scope.numPerPage = 2, $scope.maxSize = 5,
    $scope.groupImage = [];
    
    $scope.chat_group_content = function(room) {
        $scope.imageCurrentPage = 1;
        console.log(room.no);
    //    채팅방 이미지 불러오기

        $scope.images_state = room.title;

        // 채팅방 내 모든 사진
        $scope.images = [{
            no: 0,
            user: "지은",
            title: "사진이름1",
            imagePath : "/profile/danbi2.jpg"
        },{
            no: 1,
            user: "치민",
            title: "사진이름2",
            imagePath : "/profile/danbi2.jpg"
        },{
            no: 2,
            user: "경호",
            title: "사진이름3",
            imagePath : "/profile/danbi2.jpg"
        }];

        $scope.imageTotalItems = $scope.images;
        $scope.imageEndPage = $scope.numPages();
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






    //채팅방 그룹 페이징
    $scope.groups = [];
    $scope.trashs =[];

    //Images, Trash Tab 구분
    $scope.location = 0;
    
     $scope.currentPage = 1,
         $scope.totalItems = $scope.rooms;

    $scope.trashCurrentPage = 1,
        $scope.trashTotalItems = $scope.rooms_trash;


    $scope.numPages = function () {
        if($scope.location === 1)
            return Math.ceil($scope.trashTotalItems.length / $scope.numPerPage);
        else{
            if($scope.images_state === 'groups')
                return Math.ceil($scope.totalItems.length / $scope.numPerPage);

            return Math.ceil($scope.imageTotalItems.length / $scope.numPerPage);
        }

    };

    $scope.endPage = $scope.numPages();
    $scope.trashEndPage = $scope.numPages();

    $scope.range = function(total){
        var input=[];
        for(var i= 1;i<=$scope.numPages();i++){
            input.push(i);
        }
        return input;
    };

    $scope.currentPageEvent=function(num){
        console.log($scope.location + ' ' + $scope.images_state);

        if($scope.location === 1){
            $scope.trashCurrentPage= num;
        }
        else{
            if($scope.images_state == 'groups'){
                $scope.currentPage= num;
            }
            else
            {
                $scope.imageCurrentPage= num;
            }
        }

    };


    $scope.changeLocation = function(location){
        $scope.location = location;
    }

    $scope.$watch('currentPage + totalItems', function() {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;

        $scope.groups = $scope.rooms.slice(begin, end);
    });


    $scope.$watch('trashCurrentPage + trashTotalItems', function() {
        var begin = (($scope.trashCurrentPage - 1) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;

        $scope.trashs = $scope.rooms_trash.slice(begin, end);
    });


    $scope.$watch('imageCurrentPage + imageTotalItems', function() {
        var begin = (($scope.imageCurrentPage - 1) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;

        $scope.groupImage = $scope.images.slice(begin, end);
    });

});