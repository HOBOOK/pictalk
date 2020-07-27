'use strict';

var nav = document.querySelector('.navLi');
var mypageEditAlert= document.querySelector('#mypage-edit');

// app.filter('pagenationRange',function () {
//     return function(input, total) {
//         total = parseInt(total);
//         input.push('prev');
//         for (var i = 1; i < total; i++) {
//             input.push(i);
//         }
//         input.push('next')
//         return input;
//     };
// });

app.controller('mypageCtrl',function ($scope, $location,$timeout, UserService) {
    $scope.person = UserService.user;
    $scope.editAlert = false;

    $scope.selected = $location.absUrl().split("http://localhost:8080/")[1];


    $scope.currentPage = 1
        ,$scope.numPerPage = 2
        ,$scope.maxSize = 5,
        $scope.totalItems = $scope.person.album;




    $scope.follows = [];
    $scope.albums = [];


    $scope.numPages = function () {
        return Math.ceil($scope.totalItems.length / $scope.numPerPage);
    };

    $scope.endPage = $scope.numPages()-1;


    $scope.range = function(total){
        var input=[];
        for(var i= 1;i<=$scope.numPages();i++){
            input.push(i);
        }
        return input;
            };


    $scope.$watch('currentPage + totalItems', function() {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;

        // $scope.follows = $scope.person.follows.slice(begin, end);
        $scope.albums = $scope.person.album.slice(begin, end);

    });


    $scope.currentPageEvent=function(num){
        $scope.currentPage= num;

    };





    // $scope.follows = $scope.person.follows;

    // 팔로워 삭제
    $scope.followerRemove = function (follow) {
        var idx = $scope.person.follows.findIndex(function (item) {
            return item.id == follow.id;
        });

        if (idx > -1) {
            $scope.person.follows.splice(idx, 1);
        }
    }



    // 정보 수정
    $scope.showHide = false;
    $scope.editText = "수정";
    $scope.editToggle = function () {
        if ($scope.showHide == true) {
            $scope.showHide = false;

            $scope.editAlert= true;
            $timeout(function () {
                $scope.editAlert = false;
            }, 2000);

            $scope.editText = "수정";
        } else {
            $scope.showHide = true;
            $scope.editText = "저장";
        }
    }

    // 프로필 수정
    $scope.changeProfileImg = function($event,element) {

        var reader = new FileReader();
        reader.readAsDataURL(element.file);

        reader.onload = function (e) {
            $scope.person.avatar = e.target.result;
            $scope.$apply();

        }

    }


    $scope.addImg = function($event,element) {

        var reader = new FileReader();
        reader.readAsDataURL(element.file);

        reader.onload = function (e) {


            $scope.person.album.push({
                id:$scope.person.album.length+1,
                url: e.target.result,
                date: Date.now()
            });

            $scope.$apply();

        }

    }
    // 보관함 이미지 삭제
    $scope.imgRemove = function (img) {
        var idx = $scope.person.album.findIndex(function (item) {
            return item.id == img.id;
        })

        if(idx>-1){
            $scope.person.album.splice(idx,1)
        }
    };



    // $scope.totalItems = $scope.person.album;
    // $scope.currentPage = 1;
    //
    // $scope.setPage = function (pageNo) {
    //     $scope.currentPage = pageNo;
    // };
    //
    // $scope.pageChanged = function() {
    //     $log.log('Page changed to: ' + $scope.currentPage);
    // };
    //
    // $scope.maxSize = 5;
    // $scope.bigTotalItems = 175;
    // $scope.bigCurrentPage = 1;


    $scope.navBarIndex = 0;
    // 좌측 메뉴바 탭 선택 이벤트
    $scope.onClickNavBar = function(index, $event){
        $scope.navBarIndex = index;
    }

    // 좌측 메뉴바 현재 탭인지 확인
    $scope.isSelectedNavBar = function(index){
        return $scope.navBarIndex === index;
    }

});


