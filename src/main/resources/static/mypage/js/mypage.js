'use strict';

var nav = document.querySelector('.navLi');

app.controller('mypageCtrl',function ($scope, $location,UserService) {
    $scope.person = UserService.user;

    $scope.selected = $location.absUrl().split("http://localhost:8080/")[1];

    $scope.currentPage = 1
    ,$scope.numPerPage = 1
    ,$scope.maxSize = 5;

    $scope.follows = [];
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
            alert("변경사항이 저장됩니다.");
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


    // 보관함 이미지 삭제
    $scope.imgRemove = function (img) {
        var idx = $scope.person.album.findIndex(function (item) {
            return item.id == img.id;
        })

        if(idx>-1){
            $scope.person.album.splice(idx,1)
        }
    };

    // $scope.numPages = function (objects) {
    //     return Math.ceil(objects.length / $scope.numPerPage);
    // };
    //
    // $scope.$watch('currentPage + numPerPage', function() {
    //     var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    //         , end = begin + $scope.numPerPage;
    //
    //     $scope.follows = $scope.person.follows.slice(begin, end);
    // });

    $scope.totalItems = 64;
    $scope.currentPage = 4;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
        $log.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;

});


