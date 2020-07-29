app.controller("fileCtrl", function ($scope) {
    $scope.images_state = "groups";
    $scope.trash_state = "groups";

    //전체 이미지 채팅방 정보
    $scope.rooms = [{
        no: 0,
        type: 0,
        title: "방제목1AAAAaaaaaaaaaaaaaaaaaa",
        imagePath : "/chat/img/image_example.jpg"
    },{
        no: 1,
        type: 0,
        title: "방제목2방제목2방제목2방제목2방제목2방제목2",
        imagePath : "/chat/img/image_example.jpg"
    },{
        no: 2,
        type: 0,
        title: "방제목3",
        imagePath : "/chat/img/image_example.jpg"
    },{
        no: 3,
        type: 0,
        title: "방제목4",
        imagePath : "/chat/img/image_example.jpg"
    },{
        no: 4,
        type: 0,
        title: "방제목5",
        imagePath : "/chat/img/image_example.jpg"
    },{
        no: 5,
        type: 0,
        title: "방제목6",
        imagePath : "/chat/img/image_example.jpg"
    },{
        no: 6,
        type: 0,
        title: "방제목7",
        imagePath : "/chat/img/image_example.jpg"
    },{
        no: 7,
        type: 0,
        title: "방제목8",
        imagePath : "/chat/img/image_example.jpg"
    },{
        no: 8,
        type: 0,
        title: "방제목9",
        imagePath : "/chat/img/image_example.jpg"
    },{
        no: 9,
        type: 0,
        title: "방제목10",
        imagePath : "/chat/img/image_example.jpg"
    }];


    //이미지 채팅방 그룹 삭제
    $scope.room_delete = function (room) {
        var idx = $scope.rooms.findIndex(function (item) {
            return item.no == room;
        })

        if(idx>-1){
            $scope.rooms.splice(idx,1)
        }
        $("#allCheck").prop("checked",false);
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
        $("input[name='imageCheck']").prop("checked",false);
        $("#imageAllCheck").prop("checked",false);
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
    }


    //이미지 채팅방 내 개별 이미지 삭제
    $scope.image_delete = function (image) {
        console.log(image);
        var idx = $scope.images.findIndex(function (item) {
            return item.no == image;
        })

        if(idx>-1){
            $scope.images.splice(idx,1)
        }
    };

    //선택된 이미지 채팅방 그룹 삭제
    $scope.check_room_delete = function () {

        var list = $("input[name='check_list']");
        for(var i = 0; i < list.length; i++){
            if(list[i].checked){ //선택되어 있으면 배열에 값을 저장함
                $scope.room_delete(list[i].value);
            }
        }
        $("#allCheck").prop("checked",false);
    };


    //선택된 이미지 삭제
    $scope.check_image_delete = function () {

        var list = $("input[name='imageCheck']");
        for(var i = 0; i < list.length; i++){
            if(list[i].checked){ //선택되어 있으면 배열에 값을 저장함
                $scope.image_delete(list[i].value);
            }
        }
        $("#imageAllCheck").prop("checked",false);
    };






    //이미지 채팅방 현재 페이지 전체 선택
    $(function(){
        $("#allCheck").click(function(){
            if($("#allCheck").prop("checked")) {
                $("input[name='check_list']").prop("checked",true);
            } else {
                $("input[name='check_list']").prop("checked",false);
            }
        })
    });
    //채팅방 이미지 현재 페이지 전체 선택
    $(function(){
        $("#imageAllCheck").click(function(){
            if($("#imageAllCheck").prop("checked")) {
                $("input[name='imageCheck']").prop("checked",true);
            } else {
                $("input[name='imageCheck']").prop("checked",false);
            }
        })
    });



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


    $scope.range = function(total){
        var input=[];

        if($scope.location === 1){
            $scope.trashEndPage = $scope.numPages();
        }
        else{
            if($scope.images_state == 'groups'){
                $scope.endPage = $scope.numPages();
            }
            else
            {
                $scope.imageEndPage = $scope.numPages();
            }
        }

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
    
    //Tab위치 변수
    $scope.changeLocation = function(location){
        $scope.location = location;
    }

    $scope.$watch('currentPage + totalItems + endPage', function() {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;

        $scope.groups = $scope.rooms.slice(begin, end);
        if($scope.endPage<$scope.currentPage){
            $scope.currentPage = $scope.endPage;
        }
    });


    $scope.$watch('trashCurrentPage + trashTotalItems + trashEndPage', function() {
        var begin = (($scope.trashCurrentPage - 1) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;

        $scope.trashs = $scope.rooms_trash.slice(begin, end);
        if($scope.trashEndPage<$scope.trashCurrentPage){
            $scope.trashCurrentPage = $scope.trashEndPage;
        }
    });


    $scope.$watch('imageCurrentPage + imageTotalItems + imageEndPage', function() {
        var begin = (($scope.imageCurrentPage - 1) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;

        $scope.groupImage = $scope.images.slice(begin, end);
        if($scope.imageEndPage<$scope.imageCurrentPage){
            $scope.imageCurrentPage = $scope.imageEndPage;
        }
    });

});